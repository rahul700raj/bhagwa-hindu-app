const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Mantra',
      'Shloka',
      'Stotra',
      'Aarti',
      'Chalisa',
      'Bhajan',
      'Quote',
      'Teaching',
      'Festival Info',
      'Temple Info',
      'Deity Info',
      'Scripture',
      'Ritual',
      'Other'
    ]
  },
  content: {
    sanskrit: String,
    hindi: String,
    english: String,
    transliteration: String
  },
  meaning: {
    type: String
  },
  benefits: [{
    type: String
  }],
  deity: {
    type: String,
    enum: [
      'Lord Shiva',
      'Lord Vishnu',
      'Lord Rama',
      'Lord Krishna',
      'Lord Ganesha',
      'Lord Hanuman',
      'Goddess Durga',
      'Goddess Lakshmi',
      'Goddess Saraswati',
      'Goddess Kali',
      'Lord Brahma',
      'Sun God (Surya)',
      'Other'
    ]
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  audioUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  images: [{
    url: String,
    caption: String
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: String // e.g., "5 minutes", "15 minutes"
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  bookmarkedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

// Index for search
contentSchema.index({ 
  title: 'text', 
  'content.sanskrit': 'text',
  'content.hindi': 'text',
  'content.english': 'text',
  tags: 'text'
});

module.exports = mongoose.model('Content', contentSchema);
