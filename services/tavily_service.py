from tavily import TavilyClient

from config import settings


_client = None


def get_tavily_client():

    global _client

    if _client is None:

        _client = TavilyClient(
            api_key=settings.TAVILY_API_KEY
        )

    return _client


def web_search(query: str):

    if not settings.TAVILY_API_KEY:

        return "Tavily API key not configured."

    try:

        client = get_tavily_client()

        response = client.search(

            query=query,

            search_depth="basic"

        )

        results = response.get(
            "results",
            []
        )

        if not results:

            return "No web results found."

        output = []

        for item in results:

            output.append(

                f"""Title: {item.get('title','')}

URL: {item.get('url','')}

Content:
{item.get('content','')}
"""

            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Tavily Error: {e}"