import shutil
from pathlib import Path

from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from config import settings


_embedding_model = None


def get_embedding_model():
    """
    Singleton Gemini embedding model.
    """

    global _embedding_model

    if _embedding_model is None:

        _embedding_model = GoogleGenerativeAIEmbeddings(

            model=settings.EMBEDDING_MODEL,

            google_api_key=settings.GEMINI_API_KEY

        )

    return _embedding_model


def get_vectorstore(session_id: str):
    """
    Create or connect to a session-specific Chroma collection.
    """

    collection = f"rag_{session_id}"

    persist_dir = Path(settings.CHROMA_TEMP_DIR)

    persist_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    return Chroma(

        collection_name=collection,

        embedding_function=get_embedding_model(),

        persist_directory=str(persist_dir)

    )


def ingest_documents(session_id: str, documents):

    vectorstore = get_vectorstore(session_id)

    vectorstore.add_documents(documents)

    return len(documents)


def similarity_search(
    session_id: str,
    query: str,
    k: int = 4
):

    vectorstore = get_vectorstore(session_id)

    return vectorstore.similarity_search(
        query,
        k=k
    )


def delete_collection(session_id: str):
    """
    Delete a session collection.
    """

    try:

        vectorstore = get_vectorstore(session_id)

        vectorstore.delete_collection()

    except Exception:
        pass


def clear_all_chroma():
    """
    Remove all Chroma data.
    Useful for admin/testing.
    """

    chroma_dir = Path(settings.CHROMA_TEMP_DIR)

    if chroma_dir.exists():

        shutil.rmtree(chroma_dir)

    chroma_dir.mkdir(
        parents=True,
        exist_ok=True
    )