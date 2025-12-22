import os
import google.generativeai as genai


class GeminiClient:
    def __init__(self, model: str = "gemini-1.5-flash"):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY not set in environment")

        genai.configure(api_key=api_key)

        self.model = genai.GenerativeModel(
            model_name=model,
            generation_config={
                "temperature": 0.2,        # exam-focused
                "top_p": 0.9,
                "max_output_tokens": 800
            }
        )

    def generate(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)

        # Defensive handling (Gemini SDK can change formats)
        if hasattr(response, "text") and response.text:
            return response.text.strip()

        # Fallback: stringify entire response
        return str(response)
