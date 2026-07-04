from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from utils.logger import logger 
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

    logger.info("✅ Cleanup Scheduler Started")
    
@app.on_event("shutdown")
def shutdown():

    scheduler.shutdown()

    logger.critical("🛑 Cleanup Scheduler Stopped")

app.include_router(health_router, prefix="/api")
app.include_router(session_router, prefix="/api")
app.include_router(ingest_router, prefix="/api")
app.include_router(chat_router, prefix="/api")


# docker added react app

frontend_dist = Path("frontend/dist")

if frontend_dist.exists():

    app.mount(
        "/assets",
        StaticFiles(directory=frontend_dist / "assets"),
        name="assets",
    )

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_react(full_path: str):

        index_file = frontend_dist / "index.html"

        if index_file.exists():
            return FileResponse(index_file)

        return {"detail": "Frontend not built."}