import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Stack,
  Chip,
  Card,
  CardContent,
  CardActions,
  Alert,
  MenuItem,
} from '@mui/material';
import {
  RightArrowButton,
  LeftArrowButton,
  UpArrowButton,
  DownArrowButton,
  ForwardArrowButton,
  BackArrowButton,
  CircularArrowButton,
} from '../components/ArrowButton';
import {
  EnhancedTextField,
  SearchInput,
  PasswordInput,
  EnhancedSelect,
  TagInput,
  RatingInput,
  SliderInput,
} from '../components/EnhancedInputs';

const ThemeDemo: React.FC = () => {
  const [rating, setRating] = useState(3);
  const [sliderValue, setSliderValue] = useState(50);
  const [tags, setTags] = useState(['Industrial Design', 'Creativity']);
  const [selectValue, setSelectValue] = useState('');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        UCID App Design System
      </Typography>

      {/* Color Palette */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          🎨 Color Palette
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                  mx: 'auto',
                  mb: 1,
                }}
              />
              <Typography variant="body2">Primary</Typography>
                              <Typography variant="caption" color="text.secondary">#E00122</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'secondary.main',
                  borderRadius: 2,
                  mx: 'auto',
                  mb: 1,
                }}
              />
              <Typography variant="body2">Secondary</Typography>
              <Typography variant="caption" color="text.secondary">#FF6B35</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'neutral.main',
                  borderRadius: 2,
                  mx: 'auto',
                  mb: 1,
                }}
              />
              <Typography variant="body2">Neutral</Typography>
              <Typography variant="caption" color="text.secondary">#37474F</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'success.main',
                  borderRadius: 2,
                  mx: 'auto',
                  mb: 1,
                }}
              />
              <Typography variant="body2">Success</Typography>
                              <Typography variant="caption" color="text.secondary">#E00122</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Typography */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          📝 Typography System
        </Typography>
        <Stack spacing={2}>
          <Typography variant="h1">Heading 1 - Industrial Design</Typography>
          <Typography variant="h2">Heading 2 - Career Explorer</Typography>
          <Typography variant="h3">Heading 3 - User Experience</Typography>
          <Typography variant="h4">Heading 4 - Design Thinking</Typography>
          <Typography variant="h5">Heading 5 - Innovation</Typography>
          <Typography variant="h6">Heading 6 - Creativity</Typography>
          <Typography variant="subtitle1">Subtitle 1 - Connecting childhood interests to industrial design careers</Typography>
          <Typography variant="subtitle2">Subtitle 2 - AI-powered insights and personalized recommendations</Typography>
          <Typography variant="body1">
            Body 1 - This is the main body text that explains how the UCID app helps students discover their path in industrial design through interactive forms, AI analysis, and career matching.
          </Typography>
          <Typography variant="body2">
            Body 2 - Secondary text provides additional context and supporting information for the main content.
          </Typography>
          <Typography variant="button">Button Text - Call to Action</Typography>
          <Typography variant="caption">Caption text for small details and metadata</Typography>
          <Typography variant="overline">OVERLINE TEXT FOR LABELS</Typography>
        </Stack>
      </Paper>

      {/* Arrow Buttons */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          ➡️ Arrow Button Components
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Directional Arrows
            </Typography>
            <Stack spacing={2}>
              <RightArrowButton size="large">Continue</RightArrowButton>
              <LeftArrowButton size="medium">Go Back</LeftArrowButton>
              <UpArrowButton size="small">Scroll Up</UpArrowButton>
              <DownArrowButton size="medium">Scroll Down</DownArrowButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Navigation Arrows
            </Typography>
            <Stack spacing={2}>
              <ForwardArrowButton size="large">Launch App</ForwardArrowButton>
              <BackArrowButton size="medium">Previous</BackArrowButton>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <CircularArrowButton direction="left" size="medium" />
                <CircularArrowButton direction="right" size="medium" />
                <CircularArrowButton direction="up" size="small" />
                <CircularArrowButton direction="down" size="small" />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Enhanced Inputs */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          ⌨️ Enhanced Input Components
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Text Inputs
            </Typography>
            <Stack spacing={3}>
              <EnhancedTextField
                label="Standard Input"
                placeholder="Enter your text here..."
                showStatusIcon
                status="success"
              />
              <SearchInput
                label="Search"
                placeholder="Search for design concepts..."
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
              />
              <EnhancedTextField
                label="Error Input"
                placeholder="This shows an error state"
                showStatusIcon
                status="error"
                error
                helperText="This field has an error"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Specialized Inputs
            </Typography>
            <Stack spacing={3}>
              <EnhancedSelect
                label="Design Category"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value as string)}
              >
                <MenuItem value="furniture">Furniture & Homeware</MenuItem>
                <MenuItem value="vehicles">Vehicles & Transportation</MenuItem>
                <MenuItem value="electronics">Digital & Electronics</MenuItem>
                <MenuItem value="packaging">Packaging & Containers</MenuItem>
              </EnhancedSelect>
              
              <TagInput
                value={tags}
                onChange={setTags}
                placeholder="Add your interests..."
                maxTags={5}
              />
              
              <RatingInput
                value={rating}
                onChange={setRating}
                max={5}
                size="large"
              />
              
              <SliderInput
                value={sliderValue}
                onChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
                min={0}
                max={100}
                marks
                valueLabelDisplay="on"
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Component Showcase */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          🧩 Component Showcase
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interactive Card
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This card demonstrates the custom styling with hover effects and smooth transitions.
                </Typography>
              </CardContent>
              <CardActions>
                <RightArrowButton size="small">Learn More</RightArrowButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Paper Component
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Custom border radius and shadow effects
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Chip Collection
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                <Chip label="Design" color="primary" />
                <Chip label="Innovation" color="secondary" />
                <Chip label="Creativity" variant="outlined" />
                <Chip label="Technology" color="info" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Alerts and Feedback */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          🔔 Alerts & Feedback
        </Typography>
        <Stack spacing={2}>
          <Alert severity="success">
            Your design preferences have been saved successfully!
          </Alert>
          <Alert severity="info">
            Discover new career paths based on your interests and talents.
          </Alert>
          <Alert severity="warning">
            Consider exploring additional design categories to expand your options.
          </Alert>
          <Alert severity="error">
            There was an issue saving your response. Please try again.
          </Alert>
        </Stack>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Ready to Explore Your Design Future?
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Use the enhanced components and custom theme to create an engaging industrial design career exploration experience.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <ForwardArrowButton size="large">Start Your Journey</ForwardArrowButton>
          <BackArrowButton size="large">Learn More</BackArrowButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default ThemeDemo;
