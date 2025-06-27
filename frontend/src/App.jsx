import "./App.css";
import { useState } from "react";

function App() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [validity, setValidity] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);

  const handleShorten = async () => {
    setError("");
    setSuccess("");
    setShortURL("");
    setCopied(false);
    setExpiresAt(null);
    if (!longURL) {
      setError("Please enter a URL to shorten.");
      return;
    }
    setLoading(true);
    try {
      const body = { url: longURL };
      if (customCode.trim()) body.shortcode = customCode.trim();
      if (validity.trim()) body.validity = parseInt(validity, 10);
      const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setShortURL(data.shortUrl);
        setSuccess("URL shortened successfully!");
        setExpiresAt(data.expiresAt);
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
        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          maxLength={32}
        />
        <input
          type="number"
          min="1"
          placeholder="Validity (minutes, optional)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
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
            {expiresAt && (
              <div className="expiry-info">
                Expires at: {new Date(expiresAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;