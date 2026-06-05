const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getPosts,
  createPost,
  getPostById,
  likePost,
  commentPost,
  deletePost,
} = require('../controllers/postController');

// GET  /api/posts          — All posts (public)
router.get('/', getPosts);

// POST /api/posts          — Create post (private + image upload)
router.post('/', protect, upload.single('image'), createPost);

// GET  /api/posts/:id      — Single post (public)
router.get('/:id', getPostById);

// PUT  /api/posts/:id/like — Toggle like (private)
router.put('/:id/like', protect, likePost);

// POST /api/posts/:id/comment — Add comment (private)
router.post('/:id/comment', protect, commentPost);

// DELETE /api/posts/:id   — Delete post (private, owner only)
router.delete('/:id', protect, deletePost);

module.exports = router;
