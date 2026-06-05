import { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import SkeletonCard from '../components/SkeletonCard';
import { usePosts } from '../context/PostContext';

const FeedPage = () => {
  const { posts, loading, fetchPosts } = usePosts();

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        {/* Create Post Section */}
        <CreatePost />

        {/* Feed Section */}
        {loading ? (
          // Show skeleton cards while loading
          [1, 2, 3].map((k) => <SkeletonCard key={k} />)
        ) : posts.length === 0 ? (
          // Empty state
          <Box textAlign="center" py={8}>
            <Typography variant="h5" mb={1}>🌐</Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={600}>
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Be the first to share something!
            </Typography>
          </Box>
        ) : (
          // Render all posts
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </Container>
    </>
  );
};

export default FeedPage;
