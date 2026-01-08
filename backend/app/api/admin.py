from fastapi import APIRouter, HTTPException
from app.ai_engine.ingest import ingest

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/ingest")
def run_ingest():
    try:
        ingest()
        return {"status": "ok", "message": "Ingestion completed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
