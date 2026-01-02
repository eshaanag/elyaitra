import google.generativeai as genai

# -----------------------------------
# Gemini 2.5 Flash model
# -----------------------------------
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_flashcards(docs: list[str]) -> list[dict]:
    """
    Generate exam-focused flashcards from syllabus chunks.
    Returns:
    [
      { "question": "...", "answer": "..." },
      ...
    ]
    """

    if not docs:
        return []

    prompt = f"""
You are an exam-oriented tutor.

Convert the following syllabus content into concise flashcards.

Rules:
- Focus strictly on syllabus concepts
- Simple definitions, laws, principles
- No extra explanation
- Generate EXACTLY 5 flashcards
- Format strictly as:

Q: question
A: answer

Syllabus content:
{chr(10).join(docs)}
"""

    try:
        response = model.generate_content(prompt)

        if not response or not response.text:
            return []

        flashcards = []
        question = None

        for line in response.text.splitlines():
            line = line.strip()

            if line.startswith("Q:"):
                question = line.replace("Q:", "").strip()

            elif line.startswith("A:") and question:
                flashcards.append({
                    "question": question,
                    "answer": line.replace("A:", "").strip()
                })
                question = None

        return flashcards[:5]

    except Exception as e:
        print("❌ Generation failed:", e)
        return []
