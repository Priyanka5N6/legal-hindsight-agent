## Running the Application

### 1. Backend

Open a terminal and navigate to the backend:

```powershell
cd backend
```

Activate the virtual environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

Make sure your `backend/.env` contains the required API keys and configuration. **Do not commit `.env` to GitHub.**

Start the FastAPI backend on port **8001**:

```powershell
python -m uvicorn main:app --port 8001
```

The backend will be available at:

```text
http://127.0.0.1:8001
```

### 2. Frontend

Open a **second terminal** and navigate to the frontend:

```powershell
cd frontend
```

Install dependencies if needed:

```powershell
npm install
```

Start the Next.js development server:

```powershell
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

### 3. Use the Application

1. Start the backend on port `8001`.
2. Start the frontend on port `3000`.
3. Open `http://localhost:3000` in your browser.
4. Enter a legal draft paragraph.
5. Click **Check against case memory →**.
6. Compare the **Without memory** response with the **With Hindsight memory** response.
