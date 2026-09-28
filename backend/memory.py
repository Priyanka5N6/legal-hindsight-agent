"""All Hindsight calls live in this file. Nobody else should edit it."""
import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

BANK_ID = os.getenv("HINDSIGHT_BANK_ID", "case-riverside-v-halden")

client = Hindsight(
    base_url=os.getenv("HINDSIGHT_URL", "https://api.hindsight.vectorize.io"),
    api_key=os.environ["HINDSIGHT_API_KEY"],
)


def ensure_bank():
    """Create the memory bank for this case (safe to call more than once)."""
    try:
        client.create_bank(bank_id=BANK_ID, name="Legal Case Memory")
    except Exception as e:
        # Already exists, or this client version names it differently - fine either way.
        print(f"(create_bank skipped: {e})")


def retain_doc(doc_name: str, text: str):
    """RETAIN: store one case document in memory."""
    client.retain(bank_id=BANK_ID, content=f"[{doc_name}]\n{text}")


def find_relevant(query: str, limit: int = 6) -> list[str]:
       res = client.recall(bank_id=BANK_ID, query=query)
       return [r.text for r in res.results][:limit]


def check_draft(draft: str) -> str:
    """REFLECT: does this new draft contradict anything said earlier in the case?"""
    question = (
        "You are a legal case-consistency assistant. A lawyer wrote the new draft paragraph below.\n"
        "Compare it against everything remembered about this case. If it contradicts any earlier "
        "filing, testimony or stated position, say so clearly, quote or name the exact source "
        "document, and give a confidence level (0-100%). If there is no contradiction, say that.\n\n"
        f"NEW DRAFT:\n{draft}"
    )
    return client.reflect(bank_id=BANK_ID, query=question).text


def find_precedent(argument: str) -> str:
    """REFLECT: surface similar past cases that help or hurt the current argument."""
    question = (
        "Which past cases in memory are similar to the argument below? For each, name the case, "
        "say whether it SUPPORTS or HURTS our position, and explain in one or two sentences.\n\n"
        f"ARGUMENT:\n{argument}"
    )
    return client.reflect(bank_id=BANK_ID, query=question).text


def ask(question: str) -> str:
    """REFLECT: free-form question, e.g. 'What is our position on damages?'"""
    return client.reflect(bank_id=BANK_ID, query=question).text