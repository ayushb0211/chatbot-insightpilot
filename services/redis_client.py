from utils.logger import logger
import redis

from config import settings


redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    password=settings.REDIS_PASSWORD,
    db=settings.REDIS_DB,
    decode_responses=True
)

#newly adedd below


def test_connection():
    """
    Test Redis connection.
    """

    try:

        redis_client.ping()

        logger.info("✅ Redis Connected")

        return True

    except Exception as e:

        logger.critical(f"❌ Redis Connection Failed: {e}")

        return False