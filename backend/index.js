const express = require('express');
const cors = require('cors');
const {nanoid} = require('nanoid');
const {log} = require('../middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const urlDatabase = {};


app.post('/shorten', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        await log("backend", "error", "handler", "URL shortening failed: URL is required");
        return res.status(400).json({ error: 'URL is required' });
    }

    const id = nanoid(8);
    urlDatabase[id] = url;
    await log("backend", "info", "handler", `Shortened URL: ${url} to ID: ${id}`);
    res.json({ shortUrl: `http://localhost:${PORT}/${id}` });
});


app.get('/:id', async (req, res) => {
    const longUrl = urlDatabase[req.params.id];
    if (longUrl) {
        await log("backend", "info", "handler", `Redirecting ID: ${req.params.id} to URL: ${longUrl}`);
        return res.redirect(longUrl);
    } else {
        await log("backend", "warn", "handler", `URL not found for ID: ${req.params.id}`);
        return res.status(404).json({ error: 'URL not found' });
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});