import google.generativeai as genai

def generate_flashcards(chunks: list[str]) -> list[dict]:
    """
    Convert syllabus chunks into exam-focused flashcards
    """
    prompt = f"""
You are an exam-oriented tutor.
Create concise flashcards ONLY from the syllabus content below.

Rules:
- No outside knowledge
- Simple exam language
- Question + short answer
- 5 to 10 flashcards max

Syllabus:
{chr(10).join(chunks)}
"""

    response = genai.generate_content(prompt)
    text = response.text.strip()

    flashcards = []
    for line in text.split("\n"):
        if ":" in line:
            q, a = line.split(":", 1)
            flashcards.append({
                "question": q.strip(),
                "answer": a.strip()
            })

    return flashcards
