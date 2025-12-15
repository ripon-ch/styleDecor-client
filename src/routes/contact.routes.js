const express = require('express');
const router = express.Router();
const { authenticateJWT, optionalAuth } = require('../middleware/auth.middleware');

// Contact Message Schema (add to models)
const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public/Private
router.post('/', optionalAuth, async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
      userId: req.user?._id
    });

    // TODO: Send email notification to admin

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      ticketId: contactMessage._id
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get user's support tickets
// @route   GET /api/contact/my-tickets
// @access  Private
router.get('/my-tickets', authenticateJWT, async (req, res, next) => {
  try {
    const tickets = await ContactMessage.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
