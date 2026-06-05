const Post = require('../models/Post');

// ─────────────────────────────────────────────
// @desc    Get all posts (latest first)
// @route   GET /api/posts
// @access  Public
// ─────────────────────────────────────────────
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
// ─────────────────────────────────────────────
const createPost = async (req, res) => {
  try {
    const { textContent } = req.body;

    // Build image URL if a file was uploaded
    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : '';

    // Must have text or image
    if (!textContent && !imageUrl) {
      return res.status(400).json({ message: 'Post must have text or an image' });
    }

    const post = await Post.create({
      userId: req.user._id,
      username: req.user.username,
      textContent: textContent || '',
      imageUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// ─────────────────────────────────────────────
// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
// ─────────────────────────────────────────────
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// @desc    Toggle like on a post
// @route   PUT /api/posts/:id/like
// @access  Private
// ─────────────────────────────────────────────
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.find(
      (l) => l.userId.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      // Unlike: remove user from likes array
      post.likes = post.likes.filter(
        (l) => l.userId.toString() !== req.user._id.toString()
      );
    } else {
      // Like: add user to likes array
      post.likes.push({
        userId: req.user._id,
        username: req.user.username,
      });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private
// ─────────────────────────────────────────────
const commentPost = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({
      userId: req.user._id,
      username: req.user.username,
      comment: comment.trim(),
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// @desc    Delete a post (owner only)
// @route   DELETE /api/posts/:id
// @access  Private
// ─────────────────────────────────────────────
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Only the post owner can delete
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPostById,
  likePost,
  commentPost,
  deletePost,
};
