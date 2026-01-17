const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/tasks
// @desc    Get all active tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, isDaily } = req.query;
    
    let query = { isActive: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (isDaily !== undefined) query.isDaily = isDaily === 'true';
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: tasks,
      total: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/tasks
// @desc    Create new task (Admin only)
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/tasks/:id/complete
// @desc    Mark task as completed
// @access  Private
router.post('/:id/complete', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if already completed
    const alreadyCompleted = task.completedBy.some(
      completion => completion.user.toString() === req.user._id.toString()
    );
    
    if (alreadyCompleted) {
      return res.status(400).json({
        success: false,
        message: 'Task already completed'
      });
    }
    
    // Mark as completed
    const completed = await task.markCompleted(req.user._id, req.body.proof);
    
    if (completed) {
      // Award coins to user
      await req.user.addCoins(task.coinsReward, `Task Completed: ${task.title}`);
      
      // Add to user's completed tasks
      req.user.completedTasks.push(task._id);
      await req.user.save();
      
      res.json({
        success: true,
        message: 'Task completed successfully!',
        coinsEarned: task.coinsReward,
        totalCoins: req.user.coins
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/tasks/user/completed
// @desc    Get user's completed tasks
// @access  Private
router.get('/user/completed', protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      'completedBy.user': req.user._id
    }).select('title category coinsReward completedBy.$');
    
    res.json({
      success: true,
      data: tasks,
      total: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
