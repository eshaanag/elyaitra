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
        # ✅ This model is available to ALL Gemini API keys
        self.model = genai.GenerativeModel("gemini-pro")

    def generate(self, prompt: str) -> str:
        try:
            response = self.model.generate_content(prompt)

            if hasattr(response, "text") and response.text:
                return response.text.strip()

            # Fallback structure
            if hasattr(response, "candidates") and response.candidates:
                parts = response.candidates[0].content.parts
                if parts and hasattr(parts[0], "text"):
                    return parts[0].text.strip()

            print("⚠️ Unknown Gemini response:", response)
            return "The AI returned an empty response."

        except Exception as e:
            print("❌ GEMINI ERROR:", repr(e))
            return "The AI model is temporarily unavailable."
