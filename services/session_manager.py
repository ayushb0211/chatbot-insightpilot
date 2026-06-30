import os
import shutil
import uuid
from datetime import datetime, timedelta

from config import settings
from services.vectorstore import delete_collection
from services.sql_engine import delete_session_tables


# Stores active sessions in memory
# Future: replace with Redis/PostgreSQL if needed
_active_sessions = {}


def create_session() -> str:
    """
    Creates a new session.
    """

    session_id = str(uuid.uuid4())

    _active_sessions[session_id] = {
        "created_at": datetime.utcnow(),
        "last_access": datetime.utcnow(),
    }

    return session_id


def session_exists(session_id: str) -> bool:
    """
    Check whether session exists.
    """

    return session_id in _active_sessions


def update_session(session_id: str):
    """
    Update last access time.
    """

    if session_id in _active_sessions:

        _active_sessions[session_id]["last_access"] = datetime.utcnow()


def get_session(session_id: str):
    """
    Returns session info.
    """

    return _active_sessions.get(session_id)


def delete_session(session_id: str):
    """
    Delete complete session resources.
    """

    # Delete Chroma Collection
    try:
        delete_collection(session_id)
    except Exception:
        pass

    # Delete SQLite tables
    try:
        delete_session_tables(session_id)
    except Exception:
        pass

    # Delete uploaded files
    upload_dir = os.path.join("uploads", session_id)

    if os.path.exists(upload_dir):

        shutil.rmtree(upload_dir)

    # Remove session from memory
    _active_sessions.pop(session_id, None)

    return True


def cleanup_expired_sessions():
    """
    Remove inactive sessions.

    Recommended:
    Call this before every request
    OR
    Run periodically using APScheduler.
    """

    now = datetime.utcnow()

    expired = []

    for session_id, data in _active_sessions.items():

        inactive = now - data["last_access"]

        if inactive > timedelta(seconds=settings.SESSION_TIMEOUT):

            expired.append(session_id)

    for session_id in expired:

        delete_session(session_id)


def get_upload_directory(session_id: str):
    """
    Returns upload directory for a session.

    uploads/
        session_id/
            pdf
            csv
            docx
    """

    directory = os.path.join(
        "uploads",
        session_id
    )

    os.makedirs(
        directory,
        exist_ok=True
    )

    return directory