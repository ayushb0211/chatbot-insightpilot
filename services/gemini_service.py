from google import genai
from google.genai import errors as genai_errors

import time

from config import settings

MAX_RETRIES = 3

# Global Gemini client
gemini_client = None


def initialize_gemini():
    """
    Initialize Gemini client once during application startup.
    """
    global gemini_client

    if gemini_client is None:
        gemini_client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )


def get_gemini_client():
    """
    Returns initialized Gemini client.
    """
    if gemini_client is None:
        initialize_gemini()

    return gemini_client


def ask_gemini(prompt: str) -> str:
    """
    Send prompt to Gemini with retry logic.
    """

    client = get_gemini_client()

    for attempt in range(1, MAX_RETRIES + 1):

        try:

            response = client.models.generate_content(
                model=settings.MODEL_NAME,
                contents=prompt
            )

            return response.text.strip()

        except genai_errors.ServerError as e:

            if attempt == MAX_RETRIES:
                raise e

            wait = 2 ** attempt

            print(
                f"[Gemini Retry] Attempt {attempt}/{MAX_RETRIES} "
                f"failed. Waiting {wait}s..."
            )

            time.sleep(wait)

        except Exception:
            raise

    raise RuntimeError("Gemini request failed.")