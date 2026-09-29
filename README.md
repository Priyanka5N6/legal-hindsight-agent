⚖️ Legal Hindsight — AI-Powered Legal Memory & Consistency Assistant

Built with Hindsight · Team [Your Team Name]

Legal Hindsight is an AI agent that gives lawyers a persistent memory of an ongoing case. Instead of re-reading old filings every time a new draft is written, the agent retains every document as it arrives, recalls the relevant history the moment a new paragraph is submitted, and reflects on whether that draft actually holds up — flagging contradictions, surfacing precedent, and answering questions, all grounded in the case's own record.

Key Features

Memory Comparison

Paste any draft paragraph and see two answers side by side: a plain LLM with no case knowledge, and the same question answered using persistent Hindsight memory
The Hindsight-grounded answer names the exact source document it agrees or conflicts with, and gives a confidence level
A "What the agent remembered" panel shows the raw memories used to reach that answer, so the reasoning is inspectable, not just claimed

Contradiction Detection

Catches when a new draft conflicts with something established earlier in the case — a different filing, a deposition, a motion — even when the wording is completely different
Tested against both a contradicting draft and a consistent draft, so it flags real conflicts without raising false alarms

Precedent Check

Give the agent an argument and it recalls similar past cases from memory, explaining whether each one supports or hurts the current position

Ask the Case

Free-form questions about the case, answered directly from everything retained so far — no re-reading required

Case Memory Timeline

A visual timeline of every document retained into the case, in date order, with newly flagged contradictions appearing at the bottom of the timeline
Architecture
                 User (Browser)
                       |
                       | (REST)
                       v
             Next.js Frontend (TypeScript)
                       |
                       v
             FastAPI Backend (Python)
              /                    \
             /                      \
            v                        v
   Hindsight Cloud              Groq LLM
  (Retain · Recall · Reflect)   (baseline, no-memory comparison)

Key design decision: every request that needs case context goes through Hindsight's three core operations — retain, recall, reflect — kept in a single module (memory.py) rather than scattered across the codebase. A separate, memory-free call to a plain LLM is used only as a baseline for the side-by-side comparison, so the value of persistent memory is visible, not just asserted.

Tech Stack
Layer	Technology
Frontend	Next.js (App Router), TypeScript, react-markdown
Backend	Python, FastAPI, uvicorn
Persistent Memory	Hindsight Cloud (retain, recall, reflect)
Baseline LLM	Groq
Data	Synthetic, fictional legal case (no real client or case data)
Project Structure
legal-hindsight-agent/
├── backend/
│   ├── main.py          # FastAPI app and all endpoints
│   ├── memory.py         # All Hindsight calls: retain, recall, reflect
│   ├── baseline.py       # Plain LLM call with no case memory, for comparison
│   ├── case_data.py       # Synthetic case documents and sample drafts
│   ├── seed.py            # Loads the case into Hindsight (run once)
│   ├── test_demo.py       # Script to verify retain/recall/reflect end to end
│   └── requirements.txt
├── frontend/
│   └── app/
│       ├── components/
│       │   └── CompareDemo.tsx   # Memory comparison, ask, precedent, timeline UI
│       └── page.tsx
└── README.md
API Endpoints
Endpoint	Request	Response
POST /compare	{ "draft": "..." }	without_memory, with_memory, memories_used
POST /check-draft	{ "draft": "..." }	analysis, memories_used
POST /precedent	{ "argument": "..." }	analysis, memories_used
POST /ask	{ "question": "..." }	answer, memories_used
GET /memories?query=...	—	memories
GET /health	—	Confirms the server is running
Getting Started
Prerequisites
Python 3.10+
Node.js 18+
A Hindsight Cloud account and API key (ui.hindsight.vectorize.io)
A Groq API key (groq.com)
1. Clone the repository
bash
git clone https://github.com/Priyanka5N6/legal-hindsight-agent.git
cd legal-hindsight-agent
2. Configure environment variables

Create backend/.env:

HINDSIGHT_URL=https://api.hindsight.vectorize.io
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_BANK_ID=case-riverside-v-halden
GROQ_API_KEY=your_groq_api_key
3. Start the backend
bash
cd backend
pip install -r requirements.txt
python seed.py          # loads the case into memory — run once only
uvicorn main:app --reload
4. Start the frontend

Open a new terminal:

bash
cd frontend
npm install
npm run dev
5. Open the app
Service	URL
Web app	http://localhost:3000
Backend API	http://127.0.0.1:8000
API docs (Swagger)	http://127.0.0.1:8000/docs
How Hindsight Is Used

Every document in the case (a complaint, a deposition, a motion, a witness statement, and past case precedents) is retained into a single Hindsight memory bank as it arrives. When a lawyer submits a new draft, the system recalls the memories relevant to that draft, then reflects over them to check for contradictions, evaluate precedent, or answer a direct question — always citing which source document it drew on and how confident it is in the answer.

Limitations

This is a prototype built and tested on a single, fully fictional case (Riverside Logistics v. Halden Manufacturing). It is not a validated legal tool, has not been tested on real cases, and does not replace a lawyer's judgment. It is intended as a research and consistency assistant, not legal advice.

Links
Hindsight GitHub: https://github.com/vectorize-io/hindsight
Hindsight documentation: https://hindsight.vectorize.io/
What is agent memory (Vectorize): https://vectorize.io/what-is-agent-memory

Thank you!
