import redis

from config import settings


redis_client = redis.Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
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

        print("✅ Redis Connected")

        return True

    except Exception as e:

        print(f"❌ Redis Connection Failed: {e}")

        return False