import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Paper,
  Fade,
  Grow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, CheckCircle } from '@mui/icons-material';

const VideoIntroduction: React.FC = () => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    // Show the ready screen after a brief delay
    setTimeout(() => setShowReady(true), 500);
  };

  const handleStartApp = () => {
    navigate('/interests');
  };

  const handleReplayVideo = () => {
    setVideoEnded(false);
    setShowReady(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleReadyClick = () => {
    // Bypass login - go straight to the main app
    navigate('/landing');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {!videoEnded ? (
          <Grow in={!videoEnded} timeout={1000}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Welcome to Your Industrial Design Journey
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 6 }}>
                Watch this introduction to understand what awaits you
              </Typography>
              
              <Button 
                variant="text" 
                onClick={handleStartApp}
                sx={{ mb: 4 }}
              >
                Skip Introduction
              </Button>
              
              <Paper 
                elevation={8} 
                sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto', 
                  overflow: 'hidden',
                  borderRadius: 3
                }}
              >
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  controls
                  onEnded={handleVideoEnded}
                  style={{ display: 'block' }}
                >
                  <source src="/assets/What-Is-ID-001.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Paper>
            </Box>
          </Grow>
        ) : (
          <Fade in={showReady} timeout={1000}>
            <Box>
              <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Ready?
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
                You've seen what this journey is about. Now it's time to start exploring your industrial design career path.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleReadyClick}
                  sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
                >
                  Launch Application
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={handleReplayVideo}
                  sx={{ px: 4, py: 2, fontSize: '1.1rem' }}
                >
                  Watch Again
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default VideoIntroduction;
