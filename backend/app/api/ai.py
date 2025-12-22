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
@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    answer = generate_chat_response(
        question=payload.question,
        subject=payload.subject
    )

    return ChatResponse(answer=answer)
