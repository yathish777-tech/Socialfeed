import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { usePosts } from '../context/PostContext';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { createPost } = usePosts();

  // Handle image file selection and create preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setPreview('');
  };

  // Submit the post
  const handleSubmit = async () => {
    if (!text.trim() && !image) {
      setError('Please add some text or an image');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      if (text.trim()) formData.append('textContent', text.trim());
      if (image) formData.append('image', image);

      await createPost(formData);

      // Reset form
      setText('');
      setImage(null);
      setPreview('');
      setSuccess('Post created successfully! 🎉');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
          ✍️ Create a Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 1.5 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 1.5 }}>
            {success}
          </Alert>
        )}

        {/* Text input */}
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{ mb: 1.5 }}
        />

        {/* Image preview with remove button */}
        {preview && (
          <Box sx={{ position: 'relative', mb: 1.5, display: 'inline-block' }}>
            <img
              src={preview}
              alt="preview"
              style={{ maxWidth: '100%', maxHeight: 220, borderRadius: 8, display: 'block' }}
            />
            <IconButton
              onClick={removeImage}
              size="small"
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                bgcolor: 'rgba(0,0,0,0.65)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Footer: image pick + post button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="post-image-upload">
            <input
              id="post-image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton component="span" color="primary" title="Add image">
              <ImageIcon />
            </IconButton>
          </label>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ borderRadius: 5, px: 4 }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Post'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
