import "./App.css";
import { useState } from "react";

function App() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    setError("");
    setSuccess("");
    setShortURL("");
    setCopied(false);
    if (!longURL) {
      setError("Please enter a URL to shorten.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longURL }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortURL(data.shortUrl);
        setSuccess("URL shortened successfully!");
      } else {
        setError(data.error || "Error shortening URL. Please try again.");
      }
    } catch (error) {
      setError("Error shortening URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortURL) {
      navigator.clipboard.writeText(shortURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="app-bg">
      <div className="shortener-card">
        <h1>URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
        <button onClick={handleShorten} disabled={loading}>
          {loading ? <span className="spinner"></span> : "Shorten URL"}
        </button>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        {shortURL && (
          <div className="result-section">
            <h2>Shortened URL:</h2>
            <div className="short-url-row">
              <a href={shortURL} target="_blank" rel="noopener noreferrer">
                {shortURL}
              </a>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;