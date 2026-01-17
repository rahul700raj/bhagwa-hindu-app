const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1/avatar-default.png'
  },
  coins: {
    type: Number,
    default: 100 // Starting coins
  },
  level: {
    type: Number,
    default: 1
  },
  experience: {
    type: Number,
    default: 0
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  dailyLoginStreak: {
    type: Number,
    default: 0
  },
  lastLoginDate: {
    type: Date
  },
  completedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  submittedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add coins method
userSchema.methods.addCoins = async function(amount, reason) {
  this.coins += amount;
  this.experience += amount;
  
  // Level up logic
  const newLevel = Math.floor(this.experience / 1000) + 1;
  if (newLevel > this.level) {
    this.level = newLevel;
  }
  
  await this.save();
  return this.coins;
};

// Check and update daily login streak
userSchema.methods.updateDailyLogin = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!this.lastLoginDate) {
    this.dailyLoginStreak = 1;
    this.lastLoginDate = today;
    await this.addCoins(parseInt(process.env.DAILY_LOGIN_COINS) || 10, 'Daily Login');
  } else {
    const lastLogin = new Date(this.lastLoginDate);
    lastLogin.setHours(0, 0, 0, 0);
    
    const diffTime = today - lastLogin;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      // Consecutive day
      this.dailyLoginStreak += 1;
      this.lastLoginDate = today;
      await this.addCoins(parseInt(process.env.DAILY_LOGIN_COINS) || 10, 'Daily Login');
    } else if (diffDays > 1) {
      // Streak broken
      this.dailyLoginStreak = 1;
      this.lastLoginDate = today;
      await this.addCoins(parseInt(process.env.DAILY_LOGIN_COINS) || 10, 'Daily Login');
    }
    // If diffDays === 0, already logged in today
  }
  
  await this.save();
  return this.dailyLoginStreak;
};

module.exports = mongoose.model('User', userSchema);
