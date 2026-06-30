from typing import Optional

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    message: str


class SessionResponse(BaseModel):
    success: bool
    session_id: str
    message: str


# class IngestResponse(BaseModel):
#     success: bool
#     session_id: str
#     filename: str
#     message: str

class IngestResponse(BaseModel):
    success: bool
    session_id: str
    files: list[str]
    message: str


class ChatResponse(BaseModel):
    success: bool
    source: str
    answer: str
    sql_query: Optional[str] = None


class DeleteSessionResponse(BaseModel):
    success: bool
    message: str