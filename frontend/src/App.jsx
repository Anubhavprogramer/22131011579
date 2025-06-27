import "./App.css";
import { useState } from "react";
import {log} from "../../middleware/logger";

function App() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleShorten = async () => {

    if (!longURL) {
      await log("frontend", "error", "component", "Shorten button clicked without URL");
      alert("Please enter a URL to shorten.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longURL }),
      });
      const data = await res.json();
      setShortURL(data.shortUrl);
      await log("frontend", "info", "api", `Shortened URL: ${longURL} to ${data.shortUrl}`);
    } catch (error) {
      await log("frontend", "error", "api", `Error shortening URL: ${error.message}`);
      alert("Error shortening URL. Please try again.");
    }
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