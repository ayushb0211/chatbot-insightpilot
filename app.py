from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.chat import router as chat_router
from api.ingest import router as ingest_router
from api.session import router as session_router
from api.health import router as health_router

from services.gemini_service import initialize_gemini

app = FastAPI(
    title="Enterprise RAG Chatbot API",
    version="1.0.0",
    description="Session-based RAG Chatbot using Gemini, ChromaDB, SQLite and Tavily"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    initialize_gemini()


app.include_router(health_router, prefix="/api")
app.include_router(session_router, prefix="/api")
app.include_router(ingest_router, prefix="/api")
app.include_router(chat_router, prefix="/api")