from fastapi import FastAPI

app = FastAPI(
    title="Legal Hindsight Agent API",
    description="Backend for the Legal Hindsight legal research assistant",
    version="1.0.0"
)


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