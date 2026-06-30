from fastapi import APIRouter

from models.response_models import HealthResponse

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    response_model=HealthResponse
)
def health():

    return HealthResponse(

        status="running",

        message="Enterprise RAG Chatbot API is running."

    )