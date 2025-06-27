const express = require('express');
const cors = require('cors');
const {nanoId} = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const urlDatabase = {};
app.post('/shorten', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const id = nanoId(8);
    urlDatabase[id] = url;

    res.json({ shortUrl: `http://localhost:${PORT}/${id}` });
});
app.get('/:id', (req, res) => {
    const longUrl = urlDatabase[req.params.id];
    if (!longUrl) {
        return res.redirect(longUrl);
    } else {
        return res.status(404).json({ error: 'URL not found' });
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});