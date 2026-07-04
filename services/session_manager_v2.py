from utils.logger import logger
import json
import os
import shutil
import uuid
from datetime import datetime

from config import settings

from services.redis_client import redis_client
from services.vectorstore import delete_collection
from services.sql_engine import delete_session_tables


def create_session() -> str:
    """
    Creates a new Redis session.
    """

    session_id = str(uuid.uuid4())

    session_data = {
        "created_at": datetime.utcnow().isoformat(),
        "last_access": datetime.utcnow().isoformat(),
        "has_vector": False,
        "has_sql": False
    }

    redis_client.set(
        session_id,
        json.dumps(session_data),
        ex=settings.SESSION_TIMEOUT
    )

    redis_client.sadd(
    "active_sessions",
    session_id
    )
    
    return session_id


def session_exists(session_id: str) -> bool:
    """
    Returns True if session exists.
    """

    return redis_client.exists(session_id) == 1


def get_session(session_id: str):
    """
    Returns session information.
    """

    data = redis_client.get(session_id)

    if not data:
        return None

    return json.loads(data)


def update_session(session_id: str):
    """
    Update last access time
    and refresh Redis TTL.
    """

    data = redis_client.get(session_id)

    if not data:
        return

    session = json.loads(data)

    session["last_access"] = datetime.utcnow().isoformat()

    redis_client.set(
        session_id,
        json.dumps(session),
        ex=settings.SESSION_TIMEOUT
    )


def delete_session(session_id: str):
    """
    Delete all resources associated with a session.
    """

    try:
        logger.info(f"Deleting Chroma collection: {session_id}")
        delete_collection(session_id)
    except Exception as e:
        logger.warning(e)

    try:
        delete_session_tables(session_id)
    except Exception:
        pass

    upload_dir = os.path.join(
        "uploads",
        session_id
    )

    # if os.path.exists(upload_dir):
    #     shutil.rmtree(upload_dir)
    
    if os.path.exists(upload_dir):

        try:
            shutil.rmtree(upload_dir)

        except PermissionError:
            logger.warning(f"Upload folder still in use: {upload_dir}")
            return False

    redis_client.delete(session_id)
    
    redis_client.srem(
    "active_sessions",
    session_id
    )

    return True


def get_upload_directory(session_id: str):
    """
    Returns upload directory for a session.
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

#helper to change bool val

def update_session_flags(
    session_id: str,
    has_vector: bool = None,
    has_sql: bool = None
):
    data = redis_client.get(session_id)

    if not data:
        return

    session = json.loads(data)

    if has_vector is not None:
        session["has_vector"] = has_vector

    if has_sql is not None:
        session["has_sql"] = has_sql

    redis_client.set(
        session_id,
        json.dumps(session),
        ex=settings.SESSION_TIMEOUT
    )