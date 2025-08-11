import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  Paper,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  School, 
  Work, 
  Psychology, 
  TrendingUp 
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { apiService } from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setError, clearError } = useAppContext();
  const [apiStatus, setApiStatus] = React.useState<{ status: string; message: string } | null>(null);
  const [checkingApi, setCheckingApi] = React.useState(true);

  // Check API health on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        setCheckingApi(true);
        const response = await apiService.healthCheck();
        
        if (response.error) {
          setApiStatus({ status: 'error', message: 'Backend API is not available' });
          setError('Unable to connect to backend services. Some features may be limited.');
        } else {
          setApiStatus({ status: 'success', message: 'Backend API is running' });
        }
      } catch (error) {
        setApiStatus({ status: 'error', message: 'Failed to check API status' });
        setError('Unable to connect to backend services. Some features may be limited.');
      } finally {
        setCheckingApi(false);
      }
    };

    checkApiHealth();
  }, [setError]);

  const features = [
    {
      icon: <School sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Discover Your Path',
      description: 'Explore career options that match your interests and skills in industrial design.'
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI-Powered Insights',
      description: 'Get personalized career recommendations based on your creative work and interests.'
    },
    {
      icon: <Work sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Connect with Industry',
      description: 'Find companies and opportunities that align with your career goals.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Your Growth',
      description: 'Monitor your skill development and career exploration progress.'
    }
  ];

  // Show loading spinner while checking API
  if (checkingApi) {
    return (
      <Container maxWidth="lg">
        <LoadingSpinner message="Checking system status..." />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* API Status Alert */}
      {apiStatus && (
        <Alert 
          severity={apiStatus.status === 'success' ? 'success' : 'warning'} 
          sx={{ mb: 3 }}
          onClose={() => setApiStatus(null)}
        >
          {apiStatus.message}
        </Alert>
      )}

      {/* Global Error Display */}
      {state.error && (
        <ErrorDisplay 
          error={state.error} 
          onDismiss={clearError}
          severity="warning"
          title="System Notice"
        />
      )}

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Discover Your Industrial Design Career Path
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Use AI-powered insights to explore careers that match your creative interests, 
          skills, and aspirations in the world of industrial design.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/interests')}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          disabled={apiStatus?.status === 'error'}
        >
          Start Your Journey
        </Button>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ py: 3 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How It Works */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          How It Works
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary.main" sx={{ mb: 2 }}>1</Typography>
              <Typography variant="h6" gutterBottom>Share Your Interests</Typography>
              <Typography variant="body2" color="text.secondary">
                Tell us about your design interests, creative preferences, and career goals.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary.main" sx={{ mb: 2 }}>2</Typography>
              <Typography variant="h6" gutterBottom>Upload Your Work</Typography>
              <Typography variant="body2" color="text.secondary">
                Share your sketches, projects, and creative work for AI analysis.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary.main" sx={{ mb: 2 }}>3</Typography>
              <Typography variant="h6" gutterBottom>Get Insights</Typography>
              <Typography variant="body2" color="text.secondary">
                Receive personalized career recommendations and skill development guidance.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ready to explore your future in industrial design?
        </Typography>
        <Button 
          variant="outlined" 
          size="large" 
          onClick={() => navigate('/interests')}
          sx={{ mt: 2, px: 4, py: 1.5 }}
        >
          Begin Your Exploration
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
