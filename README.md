# 📚 Elyaitra – Syllabus-Bound AI Study Assistant

> **Elyaitra** is an AI-powered study assistant designed specifically for students — but with a twist:  
It only answers **from the official syllabus**. Nothing extra. Nothing irrelevant.

No note uploads. No random internet answers. Just **exam-focused, syllabus-accurate help**.

---

## 🚀 What is Elyaitra?

Elyaitra solves a very common student problem:

> “This answer looks good, but is it in our syllabus?”

Elyaitra:
- ✅ Comes with **preloaded syllabus & content**
- 🎯 Answers **strictly from exam syllabus**
- ❌ Clearly says **“Not in Syllabus”** if a topic is not required
- 🧠 Prevents over-studying & irrelevant learning
- ⚡ Works instantly with **zero setup**

---

## ✨ Key Features

- 📚 **Preloaded Syllabus, Zero Setup**  
  Students don’t upload notes or PDFs. Everything is already structured and indexed.

- 🎯 **Strictly Exam-Bound AI**  
  The AI is restricted to only answer from the allowed syllabus content.

- ❗ **Clear “Not in Syllabus” Responses**  
  If you ask something outside the syllabus, Elyaitra tells you directly.

- 🔍 **Fast Semantic Search + AI Answering**  
  Uses vector search + AI to retrieve and generate accurate, relevant answers.

- 🧩 **Subject → Unit → Topic Based Flow**  
  Fully structured and organized for real exam preparation.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🌐 Deployed on Vercel

### Backend
- 🐍 Python (FastAPI)
- 🧠 Google Gemini API
- 🧲 Vector Database (ChromaDB)

### AI / Retrieval
- 🔎 RAG (Retrieval Augmented Generation)
- 📦 Embeddings for syllabus content
- 🗂️ Chunked & indexed syllabus data

---

## 🧠 How It Works (Architecture)

1. Syllabus content is **preloaded and embedded** into a vector database.
2. User selects:
   - Subject
   - Unit
   - Topic (or asks a question)
3. The system:
   - Retrieves **only relevant syllabus chunks**
   - Sends them to the AI
   - Generates an answer **only from that content**
4. If nothing relevant is found:
   - ❌ Returns: **“Not in Syllabus”**

---

## 📸 Demo

> (Add screenshots / demo video link here)
<img width="2932" height="1472" alt="image" src="https://github.com/user-attachments/assets/eb3ea318-cf2f-48da-b9b9-e7d6c95c40e9" />

Chatbot--
<img width="2930" height="1460" alt="image" src="https://github.com/user-attachments/assets/4e6aa5e9-9bef-40af-88ec-e7d5e8bb7f5f" />
