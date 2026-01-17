const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Story title is required'],
    trim: true,
    minlength: [10, 'Title must be at least 10 characters']
  },
  content: {
    type: String,
    required: [true, 'Story content is required'],
    minlength: [50, 'Content must be at least 50 characters']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Ramayana',
      'Mahabharata',
      'Puranas',
      'Vedas',
      'Upanishads',
      'Bhagavad Gita',
      'Saints & Sages',
      'Temples',
      'Festivals',
      'Dharma',
      'Yoga & Meditation',
      'Other'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  },
  coinsAwarded: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search
storySchema.index({ title: 'text', content: 'text', tags: 'text' });

// Increment views
storySchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

// Add like
storySchema.methods.addLike = async function(userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    await this.save();
  }
};

// Remove like
storySchema.methods.removeLike = async function(userId) {
  this.likes = this.likes.filter(id => id.toString() !== userId.toString());
  await this.save();
};

module.exports = mongoose.model('Story', storySchema);
