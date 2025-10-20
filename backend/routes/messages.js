const express = require('express');
const router = express.Router();

// Example route
router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // You can save it to MongoDB here
    res.status(201).json({ success: true, message: 'Message received!' });
});

module.exports = router;
