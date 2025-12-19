import ollama

class LocalOllamaClient:
    def generate(self, prompt: str) -> str:
        response = ollama.generate(
            model="llama3:8b",
            prompt=prompt
        )
        return response["response"]
# llm_client.py

import os
import requests

class LLMClient:
    def generate(self, prompt: str) -> str:
        raise NotImplementedError


class LocalOllamaClient(LLMClient):
    def __init__(self, model: str = "llama3"):
        self.model = model
        self.url = "http://localhost:11434/api/generate"

    def generate(self, prompt: str) -> str:
        response = requests.post(
            self.url,
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False
            },
            timeout=60
        )
        return response.json()["response"]
