from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.payments import router as payments_router
from app.api.access import router as access_router
from app.api.content import router as content_router
from app.api.ai import router as ai_router

from app.db.init_db import init_db

# 🔥 TEMP DEBUG: IMPORT INGEST
# from app.ai_engine.ingest import ingest

app = FastAPI(title="Elyaitra Backend", version="0.1.0")

# ---------------------------
# CORS
# ---------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://elyaitra.com",
        "https://www.elyaitra.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# STARTUP
# ---------------------------
@app.on_event("startup")
def startup_event():
    print("🚀 Backend started")
    init_db()

    # 🔥🔥🔥 TEMP: FORCE INGEST FOR DEBUG
    # print("🔥 CALLING INGEST FROM STARTUP 🔥")
    # try:
    #     ingest()
    # except Exception as e:
    #     print("❌ INGEST ERROR:", repr(e))

# ---------------------------
# ROUTERS
# ---------------------------
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(payments_router)
app.include_router(access_router)
app.include_router(ai_router)

# ---------------------------
# LOCAL RUN
# ---------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
