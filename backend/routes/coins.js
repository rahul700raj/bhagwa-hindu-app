const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Get user's coin balance
router.get('/balance', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        coins: req.user.coins,
        level: req.user.level,
        experience: req.user.experience
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Daily login reward
router.post('/daily-login', protect, async (req, res) => {
  try {
    const streak = await req.user.updateDailyLogin();
    
    res.json({
      success: true,
      message: 'Daily login reward claimed!',
      data: {
        coins: req.user.coins,
        streak: streak,
        reward: parseInt(process.env.DAILY_LOGIN_COINS) || 10
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
