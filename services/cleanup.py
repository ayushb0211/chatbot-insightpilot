from utils.logger import logger
from services.redis_client import redis_client
from services.session_manager_v2 import delete_session


def cleanup_expired_sessions():
    """
    Delete orphaned resources whose Redis session
    has already expired.
    """

    sessions = redis_client.smembers("active_sessions")

    for session_id in sessions:

        if not redis_client.exists(session_id):

            logger.info(f"Cleaning expired session: {session_id}")

            delete_session(session_id)