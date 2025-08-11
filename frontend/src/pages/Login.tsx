import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { authService, LoginCredentials, RegisterData } from '../services';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading, setError, clearError } = useAppContext();
  
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    user_type: 'student'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      clearError();

      const response = await authService.login(credentials);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        // Store tokens
        authService.storeTokens(response.data.access_token, response.data.refresh_token);
        
        setSuccessMessage('Login successful! Redirecting...');
        setShowSuccess(true);
        
        // Redirect based on user type
        setTimeout(() => {
          if (response.data?.user?.user_type === 'student') {
            navigate('/interests');
          } else {
            navigate('/company-dashboard');
          }
        }, 1500);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.username || !registerData.email || !registerData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      clearError();

      const response = await authService.register(registerData);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setSuccessMessage('Registration successful! Please log in.');
        setShowSuccess(true);
        setIsLogin(true);
        
        // Clear form
        setRegisterData({
          username: '',
          email: '',
          password: '',
          user_type: 'student'
        });
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (event: SelectChangeEvent) => {
    setRegisterData({
      ...registerData,
      user_type: event.target.value as 'student' | 'company'
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Create a new account to get started'
            }
          </Typography>

          {isLogin ? (
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>User Type</InputLabel>
                <Select
                  value={registerData.user_type}
                  label="User Type"
                  onChange={handleUserTypeChange}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              sx={{ textTransform: 'none' }}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
