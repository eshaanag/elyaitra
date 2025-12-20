import ollama


class LocalOllamaClient:
    def __init__(self, model: str = "llama3"):
        self.model = model

    def generate(self, prompt: str) -> str:
        response = ollama.generate(
            model=self.model,
            prompt=prompt
        )

        # DEBUG: inspect response once
        # print(response)

        # OllamaResponse behaves like a dict
        if hasattr(response, "get"):
            text = response.get("response")
            if text and text.strip():
                return text

            # Fallback: some versions store output in 'message'
            msg = response.get("message")
            if isinstance(msg, dict):
                content = msg.get("content")
                if content:
                    return content

        # LAST RESORT: stringify everything
        return str(response)
