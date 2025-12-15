const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['general', 'booking', 'payment', 'services', 'account'],
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const FAQ = mongoose.model('FAQ', FAQSchema);

// src/routes/faq.routes.js
const express = require('express');
const router = express.Router();

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }

    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });

    const grouped = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    res.json({
      success: true,
      faqs: grouped
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;