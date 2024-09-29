const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/quote', async (req, res) => {
    try {
        const response = await axios.get('http://api.quotable.io/random');
        res.set('Access-Control-Allow-Origin', '*'); // Enable CORS for this route
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching quote');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
