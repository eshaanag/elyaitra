import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)


class GeminiClient:
    def __init__(self):
        try:
            self.model = genai.GenerativeModel("gemini-1.5-flash")
        except Exception:
            self.model = genai.GenerativeModel("text-bison-001")


    def generate(self, prompt: str) -> str:
        try:
            response = self.model.generate_content(prompt)
            return response.text or "No response generated."
        except Exception as e:
            print("❌ GEMINI ERROR:", repr(e))
            return "The AI model is temporarily unavailable. Please try again."
