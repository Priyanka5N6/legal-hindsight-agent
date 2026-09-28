"""'Without memory' baseline: a plain LLM call with NO Hindsight and NO case files."""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")


def baseline_check(draft: str) -> str:
    key = os.getenv("GROQ_API_KEY")
    if not key:
        return "(Baseline unavailable: GROQ_API_KEY is not set in .env)"

    prompt = (
        "You are a legal research assistant. A lawyer wrote the draft paragraph below for an "
        "ongoing case. Does it contradict anything said earlier in the case? "
        "Answer in under 120 words.\n\n"
        f"DRAFT:\n{draft}"
    )
    try:
        r = requests.post(
            GROQ_URL,
            headers={"Authorization": f"Bearer {key}"},
            json={
                "model": GROQ_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.2,
            },
            timeout=30,
        )
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"(Baseline call failed: {e})"