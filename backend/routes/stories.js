const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/stories
// @desc    Get all approved stories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    let query = { status: 'approved' };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const stories = await Story.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Story.countDocuments(query);
    
    res.json({
      success: true,
      data: stories,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/stories/:id
// @desc    Get single story
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('author', 'name avatar level')
      .populate('comments.user', 'name avatar');
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    // Increment views
    await story.incrementViews();
    
    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/stories
// @desc    Create new story
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, category, tags, images } = req.body;
    
    const story = await Story.create({
      title,
      content,
      category,
      tags,
      images,
      author: req.user._id
    });
    
    // Add to user's submitted stories
    req.user.submittedStories.push(story._id);
    await req.user.save();
    
    res.status(201).json({
      success: true,
      message: 'Story submitted successfully. Awaiting approval.',
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/stories/:id/approve
// @desc    Approve story (Admin only)
// @access  Private/Admin
router.put('/:id/approve', protect, admin, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    story.status = 'approved';
    await story.save();
    
    // Award coins to author if not already awarded
    if (!story.coinsAwarded) {
      const author = await User.findById(story.author);
      const coinsReward = parseInt(process.env.STORY_SUBMIT_COINS) || 50;
      await author.addCoins(coinsReward, 'Story Approved');
      story.coinsAwarded = true;
      await story.save();
    }
    
    res.json({
      success: true,
      message: 'Story approved successfully',
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/stories/:id/like
// @desc    Like/Unlike story
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    const isLiked = story.likes.includes(req.user._id);
    
    if (isLiked) {
      await story.removeLike(req.user._id);
    } else {
      await story.addLike(req.user._id);
    }
    
    res.json({
      success: true,
      message: isLiked ? 'Story unliked' : 'Story liked',
      likes: story.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/stories/:id/comment
// @desc    Add comment to story
// @access  Private
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    story.comments.push({
      user: req.user._id,
      text: req.body.text
    });
    
    await story.save();
    
    res.json({
      success: true,
      message: 'Comment added successfully',
      data: story.comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
