from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS - taake frontend baat kar sake
from fastapi.middleware.cors import CORSMiddleware
...
allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5175")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

# 1. Health check - frontend ye check karta hai backend zinda hai ya nahi
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

# 2. Chat endpoint - asal RAG yahan lagega
@app.post("/chat")
def chat(request: ChatRequest):
    user_q = request.question.lower()

    # Simple RAG Logic (abhi ke liye dummy, baad me isko PDF se jor denge)
    if "rag" in user_q:
        answer = "RAG ka matlab hai Retrieval-Augmented Generation. Isme bot pehle aap ke documents se information nikalta hai phir us se jawab banata hai."
        sources = ["doc1.pdf page 2", "RAG_guide.txt"]
    elif "hello" in user_q or "salam" in user_q:
        answer = "Wa Alaikum Salam! Main aap ka RAG chatbot hun. Koi sawal puchen?"
        sources = []
    else:
        answer = f"Aap ne pucha: '{request.question}'. Ye mera sample jawab hai. Jab aap documents add karenge to main un se jawab dunga."
        sources = ["sample_document.txt"]

    return {
        "answer": answer,
        "sources": sources
    }

@app.get("/")
def root():
    return {"message": "RAG Backend is running. Go to /docs for API docs"}