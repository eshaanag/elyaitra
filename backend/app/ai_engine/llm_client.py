import os
from dotenv import load_dotenv
import google.generativeai as genai

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)


class GeminiClient:
    def __init__(self, model_name: str = "models/gemini-pro"):
        self.model = genai.GenerativeModel(model_name)

    def generate(self, prompt: str) -> str:
        try:
            response = self.model.generate_content(
                prompt,
                request_options={"timeout": 15}
            )

            return response.text or "No response generated."
        except Exception as e:
            print("❌ GEMINI ERROR:", repr(e))
            return "The AI is taking too long to respond. Please try again."
