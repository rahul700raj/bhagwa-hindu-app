const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { protect } = require('../middleware/auth');

// Get all content
router.get('/', async (req, res) => {
  try {
    const { type, deity, category, search } = req.query;
    let query = { isActive: true };
    
    if (type) query.type = type;
    if (deity) query.deity = deity;
    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    
    const content = await Content.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single content
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    content.views += 1;
    await content.save();
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Like content
router.post('/:id/like', protect, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    const isLiked = content.likes.includes(req.user._id);
    
    if (isLiked) {
      content.likes = content.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      content.likes.push(req.user._id);
    }
    
    await content.save();
    res.json({ success: true, likes: content.likes.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
