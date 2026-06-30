from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import settings


def get_text_splitter():
    """
    Returns RecursiveCharacterTextSplitter instance.

    Using RecursiveCharacterTextSplitter instead of
    text.split("\\n\\n") provides:
        - Better semantic chunking
        - Configurable overlap
        - Better retrieval quality
        - Support for all document formats
    """

    return RecursiveCharacterTextSplitter(

        chunk_size=settings.CHUNK_SIZE,

        chunk_overlap=settings.CHUNK_OVERLAP,

        separators=[
            "\n\n",
            "\n",
            ". ",
            "? ",
            "! ",
            " ",
            ""
        ]
    )


def split_text(text: str):
    """
    Split text into chunks.
    """

    splitter = get_text_splitter()

    return splitter.split_text(text)