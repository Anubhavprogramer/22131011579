
# 🔗 URL Shortener with Logging Middleware

A full-stack URL shortener built using **React** (frontend), **Node.js + Express** (backend), and a shared **logging middleware** that logs to the AffordMed evaluation API.

---

## 📁 Project Structure

```

url-shortener/
├── backend/
│   ├── index.js             # Express backend
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── App.jsx          # React frontend
│   └── package.json
├── middleware/
│   ├── auth.js              # Get access token
│   └── logger.js            # Send logs to AffordMed API
├── .env                     # Secrets like clientID, etc.
└── README.md

````

---

## 🚀 Features

- Shortens long URLs.
- Redirects short URLs to the original link.
- Reusable logging middleware for both backend and frontend.
- Authenticates with AffordMed evaluation server.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd 22131011579
````

---


### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 4. Run the Project

#### Start Backend

```bash
cd backend
node index.js
```

#### Start Frontend

```bash
cd ../frontend
npm run dev
```

---

## 🔧 API Endpoints

### `POST /shorten`

**Request:**

```json
{ "longUrl": "https://example.com" }
```

**Response:**

```json
{ "shortUrl": "http://localhost:3000/abc123" }
```






## 📦 Deployment

This project is intended to run locally:

* **Backend:** [http://localhost:3000](http://localhost:3000)
* **Frontend:** [http://localhost:5173](http://localhost:5173)




