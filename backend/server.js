const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage (no database needed)
let messages = [];
let messageId = 1;

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Get all messages
app.get('/api/messages', (req, res) => {
    res.json({
        success: true,
        message: 'Messages retrieved successfully',
        data: messages
    });
});

// Create new message
app.post('/api/messages', (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newMessage = {
            id: messageId++,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            date: new Date().toISOString()
        };

        messages.push(newMessage);
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: error.message
        });
    }
});

// Delete all messages
app.delete('/api/messages', (req, res) => {
    const count = messages.length;
    messages = [];
    messageId = 1;
    
    res.json({
        success: true,
        message: `All messages (${count}) deleted successfully`
    });
});

// Get message count
app.get('/api/messages/count', (req, res) => {
    res.json({
        success: true,
        data: { count: messages.length }
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Portfolio Backend API is running!',
        endpoints: {
            health: '/api/health',
            messages: '/api/messages',
            count: '/api/messages/count'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📧 Messages API: http://localhost:${PORT}/api/messages`);
    console.log(`💾 Using in-memory storage (no MongoDB needed)`);
});