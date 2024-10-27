// download.js
const express = require('express');
const { alldown } = require('nayan-media-downloader');

const router = express.Router();

// Endpoint to download media using a GET method
router.get('/', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const data = await alldown(url);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download media' });
    }
});

module.exports = router;
