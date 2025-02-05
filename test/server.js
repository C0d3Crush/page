const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON body

// Serve static files (your HTML, CSS, and JS)
app.use(express.static('public'));

// Endpoint to get messages
app.get('/messages', (req, res) => {
    fs.readFile('messages.json', (err, data) => {
        if (err) return res.status(500).send('Error reading messages');
        res.json(JSON.parse(data || '[]'));
    });
});

// Endpoint to post a new message
app.post('/messages', (req, res) => {
    const newMessage = req.body.message;
    if (!newMessage) return res.status(400).send('Message is required');

    fs.readFile('messages.json', (err, data) => {
        const messages = err ? [] : JSON.parse(data || '[]');
        messages.push(newMessage);
        fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving message');
            res.sendStatus(200);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
