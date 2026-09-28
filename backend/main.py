from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from memory import check_draft, find_relevant, find_precedent, ask
from baseline import baseline_check

app = FastAPI(
    title="Legal Hindsight Agent API",
    description="Backend for the Legal Hindsight legal research assistant",
    version="1.0.0"
)

# Lets the frontend (running on a different port) call this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class DraftRequest(BaseModel):
    draft: str


class ArgumentRequest(BaseModel):
    argument: str


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Legal Hindsight Agent API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/check-draft")
def check_draft_endpoint(req: DraftRequest):
    """Does this new draft contradict anything said earlier in the case? (with memory)"""
    try:
        return {
            "analysis": check_draft(req.draft),
            "memories_used": find_relevant(req.draft),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/compare")
def compare_endpoint(req: DraftRequest):
    """Demo endpoint: same draft, answered WITHOUT memory and WITH Hindsight memory."""
    try:
        return {
            "without_memory": baseline_check(req.draft),
            "with_memory": check_draft(req.draft),
            "memories_used": find_relevant(req.draft),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/precedent")
def precedent_endpoint(req: ArgumentRequest):
    """Which past cases support or hurt this argument?"""
    try:
        return {
            "analysis": find_precedent(req.argument),
            "memories_used": find_relevant(req.argument),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/ask")
def ask_endpoint(req: QuestionRequest):
    """Free-form question about the case, e.g. 'What is our position on damages?'"""
    try:
        return {
            "answer": ask(req.question),
            "memories_used": find_relevant(req.question),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/memories")
def memories(query: str):
    """Raw memories matching a query (for a 'what the agent remembers' panel)."""
    try:
        return {"memories": find_relevant(query)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))