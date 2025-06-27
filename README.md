# 🔗 URL Shortener with Logging Middleware

A full-stack URL shortener built using **React** (frontend), **Node.js + Express** (backend), and a shared **logging middleware** that logs to the AffordMed evaluation API.

---

## 📁 Project Structure

url-shortener/
├── backend/
│ ├── index.js # Express backend
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── App.jsx # React frontend
│ └── package.json
├── middleware/
│ ├── auth.js # Get access token
│ └── logger.js # Send logs to AffordMed API
├── .env # Secrets like clientID, etc.
└── README.md

---

## 🚀 Features

- Shortens long URLs.
- Redirects short URLs to original.
- Reusable logging middleware (backend + frontend).
- Authenticates using AffordMed credentials.
- Uses `.env` for secure configuration.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener

3. Install Dependencies
Backend
cd backend
npm install
Frontend
cd ../frontend
npm install
4. Run the Project
Start Backend
cd backend
node index.js
Start Frontend
cd ../frontend
npm run dev
🔧 API Endpoints
POST /shorten
Request
{ "longUrl": "https://example.com" }
Response
{ "shortUrl": "http://localhost:3000/abc123" }
GET /:shortId
Redirects the user to the original URL.
🧠 How Logging Works
Logs are sent to http://20.244.56.144/evaluation-service/logs
A token is fetched once from http://20.244.56.144/evaluation-service/auth
Middleware handles:
token management
log validation
network call to log API
✨ Logger Usage Example
import { log } from "../middleware/logger.js";

await log("backend", "info", "handler", "URL shortened");
✅ Log Constraints
Field	Allowed Values
stack	"backend", "frontend"
level	"debug", "info", "warn", "error", "fatal"
package	"handler", "component", "utils", etc.
📦 Deployment
This project is intended to run locally:
Backend on http://localhost:3000
Frontend on http://localhost:5173 (if using Vite)
👨‍💻 Author
Created by Your Name
GitHub: github.com/YOUR_USERNAME
