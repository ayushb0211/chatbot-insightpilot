from fastapi import APIRouter, HTTPException

from models.response_models import (
    SessionResponse,
    DeleteSessionResponse
)

from models.request_models import (
    DeleteSessionRequest
)

from services.session_manager_v2 import (
    create_session,
    delete_session,
    session_exists
)

router = APIRouter(tags=["Session"])


@router.post(
    "/session",
    response_model=SessionResponse
)
def create_new_session():

    session_id = create_session()

    return SessionResponse(

        success=True,

        session_id=session_id,

        message="Session created successfully."

    )


@router.delete(
    "/delete-session",
    response_model=DeleteSessionResponse
)
def remove_session(request: DeleteSessionRequest):

    if not session_exists(request.session_id):

        raise HTTPException(

            status_code=404,

            detail="Session not found."

        )

    delete_session(request.session_id)

    return DeleteSessionResponse(

        success=True,

        message="Session deleted successfully."

    )