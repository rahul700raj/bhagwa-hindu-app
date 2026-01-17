const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Task description is required']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Daily Puja',
      'Mantra Chanting',
      'Scripture Reading',
      'Temple Visit',
      'Seva (Service)',
      'Meditation',
      'Yoga Practice',
      'Festival Celebration',
      'Learning',
      'Sharing Knowledge',
      'Other'
    ]
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  coinsReward: {
    type: Number,
    required: true,
    min: [10, 'Minimum reward is 10 coins']
  },
  experienceReward: {
    type: Number,
    default: 0
  },
  duration: {
    type: String, // e.g., "15 minutes", "1 hour", "1 day"
    required: true
  },
  instructions: [{
    step: Number,
    description: String
  }],
  requirements: [{
    type: String
  }],
  icon: {
    type: String,
    default: '🕉️'
  },
  image: {
    type: String
  },
  isDaily: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    proof: {
      type: String // Image URL or description
    }
  }],
  totalCompletions: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Mark task as completed by user
taskSchema.methods.markCompleted = async function(userId, proof) {
  const alreadyCompleted = this.completedBy.some(
    completion => completion.user.toString() === userId.toString()
  );
  
  if (!alreadyCompleted) {
    this.completedBy.push({
      user: userId,
      completedAt: new Date(),
      proof: proof
    });
    this.totalCompletions += 1;
    await this.save();
    return true;
  }
  
  return false;
};

module.exports = mongoose.model('Task', taskSchema);
