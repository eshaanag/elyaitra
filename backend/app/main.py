from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.payments import router as payments_router
from app.api.access import router as access_router
from app.api.content import router as content_router
from app.db.init_db import init_db

# ❌ REMOVE / COMMENT THIS
# from app.api.ai import router as ai_router


app = FastAPI(title="Elyaitra Backend", version="0.1.0")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app.mount(
    "/static",
    StaticFiles(directory=os.path.join(BASE_DIR, "static")),
    name="static",
)

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

@app.on_event("startup")
def startup_event():
    init_db()

# Routers (SAFE)
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(payments_router)
app.include_router(access_router)

# ❌ DO NOT INCLUDE AI ROUTER YET
# app.include_router(ai_router)
