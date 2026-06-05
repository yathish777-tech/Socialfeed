import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // First letter of username for avatar
  const initials = user?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#1a1a2e', borderBottom: '1px solid #2d2d4e' }}>
      <Toolbar>
        {/* Brand */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 1, color: '#e94560' }}
        >
          🌐 SocialFeed
        </Typography>

        {/* User info + Logout */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: '#e94560', width: 32, height: 32, fontSize: 13, fontWeight: 700 }}>
              {initials}
            </Avatar>
            <Typography variant="body2" sx={{ color: '#ccc', display: { xs: 'none', sm: 'block' } }}>
              {user.username}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              size="small"
              sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
