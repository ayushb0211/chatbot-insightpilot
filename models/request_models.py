from pydantic import BaseModel, Field


class SessionRequest(BaseModel):
    """
    Request model for creating a new session.
    """
    pass


class ChatRequest(BaseModel):
    """
    Chat request model.
    """

    session_id: str = Field(..., description="Unique session id")

    question: str = Field(
        ...,
        min_length=1,
        description="User question"
    )
    
    web_search: bool = False


class DeleteSessionRequest(BaseModel):
    """
    Delete session request.
    """

    session_id: str = Field(
        ...,
        description="Session to delete"
    )