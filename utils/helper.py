import os


def get_file_extension(filename: str):

    return os.path.splitext(
        filename
    )[1].lower()


def is_document(extension: str):

    return extension in [
        ".txt",
        ".pdf",
        ".docx"
    ]


def is_csv(extension: str):

    return extension == ".csv"


def is_excel(extension: str):

    return extension in [
        ".xlsx",
        ".xls"
    ]