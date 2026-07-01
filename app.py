from apscheduler.schedulers.background import BackgroundScheduler
from services.cleanup import cleanup_expired_sessions

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.chat import router as chat_router
from api.ingest import router as ingest_router
from api.session import router as session_router
from api.health import router as health_router

from services.gemini_service import initialize_gemini

scheduler = BackgroundScheduler()

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


# @app.on_event("startup")
# def startup():
#     initialize_gemini()


@app.on_event("startup")
def startup():

    initialize_gemini()

    scheduler.add_job(
        cleanup_expired_sessions,
        trigger="interval",
        minutes=2,
        id="cleanup_expired_sessions",
        replace_existing=True,
    )

    scheduler.start()

    print("✅ Cleanup Scheduler Started")
    
@app.on_event("shutdown")
def shutdown():

    scheduler.shutdown()

    print("🛑 Cleanup Scheduler Stopped")

app.include_router(health_router, prefix="/api")
app.include_router(session_router, prefix="/api")
app.include_router(ingest_router, prefix="/api")
app.include_router(chat_router, prefix="/api")