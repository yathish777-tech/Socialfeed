const mongoose = require('mongoose');

// Sub-schema for comments
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Main post schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    textContent: {
      type: String,
      trim: true,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    // Array of users who liked this post
    likes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String },
      },
    ],
    // Array of comments
    comments: [commentSchema],
  },
  { timestamps: true }
);

// Validate: post must have text or image
postSchema.pre('save', function (next) {
  if (!this.textContent && !this.imageUrl) {
    return next(new Error('Post must have at least text or an image'));
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
