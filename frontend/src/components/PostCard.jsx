import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
  Collapse,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
  const { toggleLike, addComment, deletePost } = usePosts();
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Check if current user has liked this post
  const isLiked = post.likes.some((l) => l.userId === user?._id);

  // Check if current user owns this post
  const isOwner = post.userId === user?._id;

  const handleLike = () => toggleLike(post._id);

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await addComment(post._id, commentText.trim());
      setCommentText('');
    } catch (err) {
      console.error('Comment failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Submit comment on Enter key (without Shift)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post._id);
    }
  };

  // Format time since post was created
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <Card sx={{ mb: 2.5, borderRadius: 3, boxShadow: 2, '&:hover': { boxShadow: 4 }, transition: 'box-shadow 0.2s' }}>
      <CardContent sx={{ pb: 0 }}>
        {/* ── Post Header: Avatar + Username + Time ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Avatar sx={{ bgcolor: '#e94560', fontWeight: 700 }}>
            {post.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
              {post.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {timeAgo}
            </Typography>
          </Box>
          {/* Delete button — only visible to post owner */}
          {isOwner && (
            <IconButton onClick={handleDelete} size="small" color="error" title="Delete post">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* ── Post Text Content ── */}
        {post.textContent && (
          <Typography variant="body1" sx={{ mb: 1.5, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
            {post.textContent}
          </Typography>
        )}
      </CardContent>

      {/* ── Post Image ── */}
      {post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt="post"
          sx={{ maxHeight: 420, objectFit: 'cover' }}
        />
      )}

      {/* ── Like + Comment Actions ── */}
      <CardActions sx={{ px: 2, pt: 1, pb: 0.5 }}>
        {/* Like button */}
        <IconButton
          onClick={handleLike}
          size="small"
          color={isLiked ? 'error' : 'default'}
          sx={{ transition: 'transform 0.15s', '&:active': { transform: 'scale(1.3)' } }}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          {post.likes.length}
        </Typography>

        {/* Comment toggle */}
        <IconButton
          onClick={() => setShowComments((v) => !v)}
          size="small"
          color={showComments ? 'primary' : 'default'}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {post.comments.length}
        </Typography>
      </CardActions>

      {/* ── Comments Collapse Panel ── */}
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Divider sx={{ mt: 0.5 }} />
        <Box sx={{ px: 2, py: 1.5 }}>
          {/* Existing comments */}
          {post.comments.length === 0 ? (
            <Typography variant="caption" color="text.secondary">
              No comments yet. Be first!
            </Typography>
          ) : (
            post.comments.map((c, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography component="span" variant="caption" fontWeight={700}>
                  {c.username}{' '}
                </Typography>
                <Typography component="span" variant="caption">
                  {c.comment}
                </Typography>
              </Box>
            ))
          )}

          {/* Add new comment */}
          <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="outlined"
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleComment}
              disabled={submitting || !commentText.trim()}
              sx={{ borderRadius: 2, whiteSpace: 'nowrap', px: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default PostCard;
