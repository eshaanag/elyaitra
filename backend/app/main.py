from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.payments import router as payments_router
from app.api.access import router as access_router

app = FastAPI(
    title="Elyaitra Backend",
    version="0.1.0"
)

# ✅ CORRECT CORS CONFIG (PRODUCTION SAFE)
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

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(payments_router)
app.include_router(access_router)
