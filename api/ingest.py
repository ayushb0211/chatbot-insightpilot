import os
import shutil

from typing import Annotated

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException
)

from models.response_models import IngestResponse

from services.session_manager_v2 import (
    session_exists,
    update_session,
    get_upload_directory
)

from services.document_loader import create_documents
from services.vectorstore import ingest_documents
from services.sql_engine import (
    ingest_csv,
    ingest_excel
)

router = APIRouter(tags=["Ingest"])


@router.post(
    "/ingest",
    response_model=IngestResponse
)
async def ingest_files(

    # session_id: str = Form(...),
    # files: list[UploadFile] = File(...)
    
    session_id: Annotated[str, Form()],
    files: Annotated[list[UploadFile], File()]

):

    if not session_exists(session_id):

        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    update_session(session_id)

    upload_dir = get_upload_directory(session_id)

    results = []

    uploaded_files = []

    for file in files:

        try:

            file_path = os.path.join(
                upload_dir,
                file.filename
            )

            with open(file_path, "wb") as buffer:

                shutil.copyfileobj(
                    file.file,
                    buffer
                )

            extension = os.path.splitext(
                file.filename
            )[1].lower()

            if extension in [
                ".txt",
                ".pdf",
                ".docx"
            ]:

                docs = create_documents(file_path)

                total_chunks = ingest_documents(
                    session_id,
                    docs
                )

                results.append(
                    f"{file.filename} : Indexed {total_chunks} chunks"
                )

            elif extension == ".csv":

                table = ingest_csv(
                    file_path,
                    session_id
                )

                results.append(
                    f"{file.filename} : Imported to table '{table}'"
                )

            elif extension in [
                ".xlsx",
                ".xls"
            ]:

                tables = ingest_excel(
                    file_path,
                    session_id
                )

                results.append(
                    f"{file.filename} : Imported {len(tables)} sheet(s)"
                )

            else:

                results.append(
                    f"{file.filename} : Unsupported file type"
                )

                continue

            uploaded_files.append(
                file.filename
            )

        except Exception as e:

            results.append(
                f"{file.filename} : Failed ({str(e)})"
            )

    return IngestResponse(

        success=True,

        session_id=session_id,

        files=uploaded_files,

        message="\n".join(results)

    )