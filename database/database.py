import os
import sqlite3

from config import settings


def get_connection():
    """
    Returns database connection.

    Currently:
        SQLite

    Future:
        PostgreSQL
        MySQL
        MSSQL
    """

    if settings.DB_TYPE.lower() == "sqlite":

        db_dir = os.path.dirname(
            settings.SQLITE_DB
        )

        os.makedirs(
            db_dir,
            exist_ok=True
        )

        return sqlite3.connect(
            settings.SQLITE_DB
        )

    raise NotImplementedError(
        f"{settings.DB_TYPE} is not implemented."
    )