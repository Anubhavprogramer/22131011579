const express = require('express');
const cors = require('cors');
const {nanoid} = require('nanoid');
const {log} = require('../middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const isValidShortcode = (code) => /^[a-zA-Z0-9]{4,32}$/.test(code);

// urlDatabase: { [shortcode]: { url, expiresAt } }
const urlDatabase = {};

app.post('/shorten', async (req, res) => {
    const { url, shortcode, validity } = req.body;
    if (!url) {
        await log("backend", "error", "handler", "URL shortening failed: URL is required");
        return res.status(400).json({ error: 'URL is required' });
    }

    // Validity in minutes, default 30
    let minutes = 30;
    if (validity !== undefined) {
        if (typeof validity !== 'number' || validity <= 0) {
            await log("backend", "error", "handler", "Invalid validity period");
            return res.status(400).json({ error: 'Validity must be a positive integer (minutes)' });
        }
        minutes = validity;
    }
    const expiresAt = Date.now() + minutes * 60 * 1000;

    let code = shortcode;
    if (code) {
        if (!isValidShortcode(code)) {
            await log("backend", "warn", "handler", `Invalid custom shortcode: ${code}`);
            return res.status(400).json({ error: 'Custom shortcode must be alphanumeric and 4-32 characters' });
        }
        if (urlDatabase[code] && urlDatabase[code].expiresAt > Date.now()) {
            await log("backend", "warn", "handler", `Shortcode collision: ${code}`);
            return res.status(409).json({ error: 'Custom shortcode already in use' });
        }
    } else {
        // Generate unique shortcode
        do {
            code = nanoid(8);
        } while (urlDatabase[code] && urlDatabase[code].expiresAt > Date.now());
    }

    urlDatabase[code] = { url, expiresAt };
    await log("backend", "info", "handler", `Shortened URL: ${url} to ID: ${code} (expires in ${minutes} min)`);
    res.json({ shortUrl: `http://localhost:${PORT}/${code}`, shortcode: code, expiresAt });
});

app.get('/:id', async (req, res) => {
    const entry = urlDatabase[req.params.id];
    if (entry) {
        if (Date.now() > entry.expiresAt) {
            await log("backend", "warn", "handler", `Shortcode expired: ${req.params.id}`);
            return res.status(410).json({ error: 'Short link expired' });
        }
        await log("backend", "info", "handler", `Redirecting ID: ${req.params.id} to URL: ${entry.url}`);
        return res.redirect(entry.url);
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