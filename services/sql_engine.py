import os
import re
import sqlite3

import pandas as pd

from config import settings

from database.database import get_connection


# def get_connection():
#     """
#     Returns SQLite connection.
#     """

#     db_dir = os.path.dirname(settings.SQLITE_DB)

#     os.makedirs(db_dir, exist_ok=True)

#     return sqlite3.connect(settings.SQLITE_DB)


def clean_table_name(filename: str, session_id: str):

    base = os.path.splitext(
        os.path.basename(filename)
    )[0]

    base = re.sub(
        r"[^a-zA-Z0-9]",
        "_",
        base
    ).lower()

    # return f"{session_id}_{base}"
    return f"tbl_{session_id.replace('-', '_')}_{base}"


def clean_columns(df):

    df.columns = [

        re.sub(
            r"[^a-zA-Z0-9_]",
            "",
            col.replace(" ", "_")
        ).lower()

        for col in df.columns

    ]

    return df


# def ingest_csv(file_path: str, session_id: str):

#     df = pd.read_csv(file_path)

#     df = clean_columns(df)

#     table_name = clean_table_name(
#         file_path,
#         session_id
#     )

#     conn = get_connection()

#     df.to_sql(
#         table_name,
#         conn,
#         if_exists="replace",
#         index=False
#     )

#     conn.close()

#     return table_name

def ingest_csv(file_path: str, session_id: str):

    df = pd.read_csv(file_path)

    df = clean_columns(df)

    table_name = clean_table_name(
        file_path,
        session_id
    )

    conn = get_connection()

    try:

        df.to_sql(
            table_name,
            conn,
            if_exists="replace",
            index=False
        )

    finally:

        conn.close()

    return table_name

# def ingest_excel(file_path: str, session_id: str):

#     conn = get_connection()

#     excel = pd.ExcelFile(file_path)

#     tables = []

#     for sheet in excel.sheet_names:

#         df = pd.read_excel(
#             file_path,
#             sheet_name=sheet
#         )

#         df = clean_columns(df)

#         table = clean_table_name(
#             f"{file_path}_{sheet}",
#             session_id
#         )

#         df.to_sql(
#             table,
#             conn,
#             if_exists="replace",
#             index=False
#         )

#         tables.append(table)

#     conn.close()

#     return tables

def ingest_excel(file_path: str, session_id: str):

    conn = get_connection()

    try:

        tables = []

        with pd.ExcelFile(file_path) as excel:

            for sheet in excel.sheet_names:

                df = pd.read_excel(
                    excel,
                    sheet_name=sheet
                )

                df = clean_columns(df)

                table = clean_table_name(
                    f"{file_path}_{sheet}",
                    session_id
                )

                df.to_sql(
                    table,
                    conn,
                    if_exists="replace",
                    index=False
                )

                tables.append(table)

        return tables

    finally:

        conn.close()


def get_schema(session_id: str):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        "SELECT name FROM sqlite_master WHERE type='table';"
    )

    # tables = [

    #     t[0]

    #     for t in cursor.fetchall()

    #     if t[0].startswith(session_id)

    # ]
    prefix = f"tbl_{session_id.replace('-', '_')}_"

    tables = [

        t[0]

        for t in cursor.fetchall()

        if t[0].startswith(prefix)

    ]

    if not tables:

        conn.close()

        return ""

    schema = []

    for table in tables:

        cursor.execute(
            # f"PRAGMA table_info({table});"
            f'PRAGMA table_info("{table}");'
        )

        columns = cursor.fetchall()

        column_desc = ", ".join(
            f"{c[1]} ({c[2]})"
            for c in columns
        )

        schema.append(
            f"Table: {table}\nColumns: {column_desc}"
        )

    conn.close()

    return "\n\n".join(schema)


def execute_sql(sql: str):

    conn = get_connection()

    try:

        if not sql.lower().strip().startswith("select"):

            return {
                "ok": False,
                "error": "Only SELECT queries allowed."
            }

        df = pd.read_sql_query(
            sql,
            conn
        )

        return {
            "ok": True,
            "count": len(df),
            "rows": df.to_dict(
                orient="records"
            )
        }

    except Exception as e:

        return {
            "ok": False,
            "error": str(e)
        }

    finally:

        conn.close()


def delete_session_tables(session_id: str):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        "SELECT name FROM sqlite_master WHERE type='table';"
    )

    # tables = [

    #     t[0]

    #     for t in cursor.fetchall()

    #     if t[0].startswith(session_id)

    # ]
    
    prefix = f"tbl_{session_id.replace('-', '_')}_"

    tables = [

        t[0]

        for t in cursor.fetchall()

        if t[0].startswith(prefix)

    ]

    for table in tables:

        cursor.execute(
            f"DROP TABLE IF EXISTS {table}"
        )

    conn.commit()

    conn.close()