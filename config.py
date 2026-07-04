import os
from dotenv import load_dotenv

# load_dotenv()
load_dotenv(override=True)

class Settings:

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

    MODEL_NAME = os.getenv(
        "MODEL_NAME",
        "gemini-2.5-flash-lite"
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

    # SESSION_TIMEOUT = int(
    #     os.getenv(
    #         "SESSION_TIMEOUT",
    #         1800
    #     )
    # )

    CHUNK_SIZE = int(
        os.getenv(
            "CHUNK_SIZE",
            700
        )
    )

    CHUNK_OVERLAP = int(
        os.getenv(
            "CHUNK_OVERLAP",
            150
        )
    )


    
    SESSION_TIMEOUT = int(
    os.getenv(
        "SESSION_TIMEOUT"
    )
    )

    REDIS_HOST = os.getenv(
        "REDIS_HOST",
        "localhost"
    )

    REDIS_PORT = int(
        os.getenv(
            "REDIS_PORT",
            6379
        )
    )

    REDIS_DB = int(
        os.getenv(
            "REDIS_DB",
            0
        )
    )
    
    REDIS_PASSWORD = str(
        os.getenv(
            "REDIS_PASSWORD",
            ""
        )
    )
        
settings = Settings()