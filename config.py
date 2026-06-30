import os
from dotenv import load_dotenv

load_dotenv()


class Settings:

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

    MODEL_NAME = os.getenv(
        "MODEL_NAME",
        "gemini-3-flash-preview"
    )

    EMBEDDING_MODEL = os.getenv(
        "EMBEDDING_MODEL",
        "models/gemini-embedding-001"
    )

    DB_TYPE = os.getenv(
        "DB_TYPE",
        "sqlite"
    )

    SQLITE_DB = os.getenv(
        "SQLITE_DB",
        "database/rag_tables.db"
    )

    CHROMA_TEMP_DIR = os.getenv(
        "CHROMA_TEMP_DIR",
        "temp/chroma"
    )

    SESSION_TIMEOUT = int(
        os.getenv(
            "SESSION_TIMEOUT",
            1800
        )
    )

    CHUNK_SIZE = int(
        os.getenv(
            "CHUNK_SIZE",
            1000
        )
    )

    CHUNK_OVERLAP = int(
        os.getenv(
            "CHUNK_OVERLAP",
            200
        )
    )


settings = Settings()