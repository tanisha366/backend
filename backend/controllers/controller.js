const Message = require('../models/Message');

// -------------------------------
// 📬 Get all messages
// -------------------------------
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages, // 👈 matches frontend loadMessages()
    });
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching messages.',
    });
  }
};

// -------------------------------
// ✉️ Create a new message
// -------------------------------
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    const newMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('❌ Error creating message:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while creating message.',
    });
  }
};

// -------------------------------
// 🧹 Delete ALL messages
// -------------------------------
exports.deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'All messages deleted successfully.',
    });
  } catch (error) {
    console.error('❌ Error deleting messages:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting messages.',
    });
  }
};

// -------------------------------
// ❌ Delete a single message by ID
// -------------------------------
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting message.',
    });
  }
};

// -------------------------------
// 🔢 Get message count
// -------------------------------
exports.getMessageCount = async (req, res) => {
  try {
    const count = await Message.countDocuments();
    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('❌ Error getting message count:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while getting message count.',
    });
  }
};
