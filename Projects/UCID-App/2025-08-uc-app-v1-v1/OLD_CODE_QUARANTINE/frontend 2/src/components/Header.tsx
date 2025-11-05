import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🎨 UC Industrial Design Career Explorer
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {authService.isAuthenticated() ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/interests')}
              >
                Start Exploring
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/career-exploration')}
              >
                Careers
              </Button>
              <Button 
                color="inherit" 
                onClick={() => {
                  authService.logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/')}
              >
                Get Started
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
