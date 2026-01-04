from fastapi import APIRouter
from pydantic import BaseModel

from app.ai_engine.generators.chat import generate_chat_response

router = APIRouter(prefix="/ai", tags=["AI"])

# --------------------------------------------------
# REQUEST / RESPONSE SCHEMAS
# --------------------------------------------------
class ChatRequest(BaseModel):
    subject: str
    question: str

class ChatResponse(BaseModel):
    answer: str

# --------------------------------------------------
# CHAT ENDPOINT
# --------------------------------------------------
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.ai_engine.generators.chat import generate_chat_response

router = APIRouter(prefix="/ai", tags=["AI"])

class ChatRequest(BaseModel):
    subject: str
    question: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    try:
        print("💬 CHAT PAYLOAD:", payload.subject, payload.question)

        answer = generate_chat_response(
            question=payload.question,
            subject=payload.subject
        )

        print("✅ CHAT ANSWER GENERATED")
        return ChatResponse(answer=answer)

    except Exception as e:
        print("❌ CHAT ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))
