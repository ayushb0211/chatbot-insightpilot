import json

from services.gemini_service import ask_gemini
from services.vectorstore import similarity_search
from services.sql_engine import (
    get_schema,
    execute_sql
)
from services.tavily_service import web_search


def rag_query(
    session_id: str,
    user_query: str,
    enable_web_search: bool = False
):
    """
    Enterprise RAG Pipeline

    Step 1:
        Search ChromaDB

    Step 2:
        Search SQLite

    Step 3:
        Search Tavily
    """

    # =====================================================
    # STEP 1 : VECTOR SEARCH
    # =====================================================

    documents = similarity_search(
        session_id=session_id,
        query=user_query,
        k=4
    )

    if documents:

        context = "\n\n".join(
            doc.page_content
            for doc in documents
        )

        prompt = f"""
You are an intelligent assistant.

Question:
{user_query}

Context:
{context}

Instructions:

- Answer ONLY using the provided context.
- If the context contains the answer,
  answer clearly.

- If the answer is not available,
  reply ONLY with:

NOT_FOUND
"""

        answer = ask_gemini(prompt)

        if "NOT_FOUND" not in answer.upper():

            return {
                "success": True,
                "source": "vectorstore",
                "answer": answer
            }

    # =====================================================
    # STEP 2 : SQL SEARCH
    # =====================================================

    schema = get_schema(session_id)

    if schema:

        sql_prompt = f"""
You are an SQLite expert.

Database Schema

{schema}

User Question

{user_query}

Rules:

1. Generate ONLY SQLite SELECT query.

2. Never generate INSERT,
UPDATE,
DELETE,
DROP,
ALTER.

3. Output only SQL.
"""

        sql_query = ask_gemini(sql_prompt)

        sql_query = (
            sql_query
            .replace("```sql", "")
            .replace("```", "")
            .strip()
        )

        sql_result = execute_sql(sql_query)

        if (

            sql_result["ok"]

            and

            sql_result["count"] > 0

        ):

            answer_prompt = f"""
Question

{user_query}

SQL Query

{sql_query}

SQL Result

{json.dumps(sql_result['rows'], indent=2)}

Using ONLY these SQL results,
answer the user's question.
"""

            sql_answer = ask_gemini(answer_prompt)

            return {

                "success": True,

                "source": "sqlite",

                "sql_query": sql_query,

                "answer": sql_answer

            }
            
    if not enable_web_search:

        return {
            "success": True,
            "source": "none",
            "answer": "Answer not found in uploaded documents."
        }
    # =====================================================
    # STEP 3 : WEB SEARCH
    # =====================================================

    web_results = web_search(user_query)

    web_prompt = f"""
User Question

{user_query}

Web Search Results

{web_results}

Instructions

- Answer the user's question using
the web search results.

- Mention that this answer
was obtained from web search.

- If the search results are
insufficient, clearly mention it.
"""

    web_answer = ask_gemini(web_prompt)

    return {

        "success": True,

        "source": "tavily",

        "answer": web_answer

    }