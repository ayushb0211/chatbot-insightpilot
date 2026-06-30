from fastapi import (
    APIRouter,
    HTTPException
)

from models.request_models import ChatRequest

from models.response_models import ChatResponse

from services.session_manager import (
    session_exists,
    update_session,
    cleanup_expired_sessions
)

from services.rag import rag_query

router = APIRouter(tags=["Chat"])


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    cleanup_expired_sessions()

    if not session_exists(request.session_id):

        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    update_session(request.session_id)

    result = rag_query(

        session_id=request.session_id,

        user_query=request.question,
        
        enable_web_search=request.web_search

    )

    return ChatResponse(

        success=result["success"],

        source=result["source"],

        answer=result["answer"],

        sql_query=result.get("sql_query")

    )