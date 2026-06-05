import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Helper: authorization header
  const authHeader = () => ({
    Authorization: `Bearer ${user?.token}`,
  });

  // Fetch all posts from API
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new post (FormData for image support)
  const createPost = async (formData) => {
    const res = await api.post('/posts', formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    // Prepend new post to the feed
    setPosts((prev) => [res.data, ...prev]);
    return res.data;
  };

  // Toggle like on a post
  const toggleLike = async (postId) => {
    const res = await api.put(
      `/posts/${postId}/like`,
      {},
      { headers: authHeader() }
    );
    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? res.data : p))
    );
  };

  // Add a comment to a post
  const addComment = async (postId, comment) => {
    const res = await api.post(
      `/posts/${postId}/comment`,
      { comment },
      { headers: authHeader() }
    );
    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? res.data : p))
    );
  };

  // Delete a post
  const deletePost = async (postId) => {
    await api.delete(`/posts/${postId}`, { headers: authHeader() });
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <PostContext.Provider
      value={{ posts, loading, fetchPosts, createPost, toggleLike, addComment, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
