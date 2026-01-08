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

            # Case 1: Sometimes this works
            if hasattr(response, "text") and response.text:
                return response.text.strip()

            # Case 2: New Gemini SDK structure
            if hasattr(response, "candidates") and response.candidates:
                cand = response.candidates[0]
                if hasattr(cand, "content") and hasattr(cand.content, "parts"):
                    parts = cand.content.parts
                    if parts and hasattr(parts[0], "text"):
                        return parts[0].text.strip()

            # If we reach here, print full object for debugging
            print("⚠️ Gemini returned empty or unknown response structure:")
            print(response)

            return "The AI model returned an empty response."

        except Exception as e:
            print("❌ GEMINI ERROR:", repr(e))
            return "The AI model is temporarily unavailable. Please try again."

