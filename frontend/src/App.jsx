import "./App.css";
import { useState } from "react";

function App() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleShorten = async () => {
  
    const res = await fetch("http://localhost:3000/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longURL }),
    });
    const data = await res.json();
    setShortURL(data.shortUrl);
  };

  return(
    <div className="App">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL to shorten"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten URL</button>
      {shortURL && (
        <div>
          <h2>Shortened URL:</h2>
          <a href={shortURL} target="_blank" rel="noopener noreferrer">
            {shortURL}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;