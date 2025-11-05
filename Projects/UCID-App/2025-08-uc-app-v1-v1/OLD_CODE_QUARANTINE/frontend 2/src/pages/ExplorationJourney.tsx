import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
  Grow,
  Alert,
  LinearProgress,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Add,
  Search,
  Lightbulb,
  AutoAwesome,
  TrendingUp,
  Psychology,
  School,
  Work,
  Star,
  Explore,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { EnhancedTextField, TagInput } from '../components/EnhancedInputs';
import { ForwardArrowButton, CircularArrowButton } from '../components/ArrowButton';

interface ExplorationItem {
  id: string;
  text: string;
  type: 'interest' | 'talent' | 'activity' | 'concept';
  confidence: number;
  timestamp: Date;
  relatedItems: string[];
}

interface SuggestionBox {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
  relatedItems: string[];
  route: string;
}

const ExplorationJourney: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [explorationItems, setExplorationItems] = useState<ExplorationItem[]>([]);
  const [suggestionBoxes, setSuggestionBoxes] = useState<SuggestionBox[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize suggestion boxes
  useEffect(() => {
    const initialBoxes: SuggestionBox[] = [
      {
        id: 'auto',
        title: 'Auto & Transportation',
        description: 'Vehicles, mobility, automotive design',
        icon: <TrendingUp />,
        color: '#FF6B35',
        isActive: false,
        relatedItems: ['cars', 'vehicles', 'transportation', 'mobility', 'engineering'],
        route: '/career-exploration/auto'
      },
      {
        id: 'toy',
        title: 'Toys & Games',
        description: 'Playful design, entertainment, creativity',
        icon: <Star />,
        color: '#E00122',
        isActive: false,
        relatedItems: ['toys', 'games', 'play', 'entertainment', 'creativity'],
        route: '/career-exploration/toy'
      },
      {
        id: 'footwear',
        title: 'Footwear & Fashion',
        description: 'Wearable design, style, comfort',
        icon: <Work />,
        color: '#2196F3',
        isActive: false,
        relatedItems: ['shoes', 'fashion', 'wearable', 'style', 'comfort'],
        route: '/career-exploration/footwear'
      },
      {
        id: 'concept',
        title: 'Concept Art',
        description: 'Visual storytelling, imagination, aesthetics',
        icon: <AutoAwesome />,
        color: '#9C27B0',
        isActive: false,
        relatedItems: ['art', 'drawing', 'concept', 'visual', 'aesthetics'],
        route: '/career-exploration/concept'
      },
      {
        id: 'product',
        title: 'Product Design',
        description: 'Innovation, functionality, user experience',
        icon: <Lightbulb />,
        color: '#FF9800',
        isActive: false,
        relatedItems: ['product', 'innovation', 'functionality', 'user experience', 'design'],
        route: '/career-exploration/product'
      }
    ];
    setSuggestionBoxes(initialBoxes);
  }, []);

  // Generate intelligent prompts based on user input
  useEffect(() => {
    if (explorationItems.length === 0) {
      setCurrentPrompt("What interests you? What are you good at? What do you love to do?");
      return;
    }

    const recentItems = explorationItems.slice(-3);
    const interests = recentItems.filter(item => item.type === 'interest');
    const talents = recentItems.filter(item => item.type === 'talent');
    const activities = recentItems.filter(item => item.type === 'activity');

    let prompt = '';
    
    if (interests.length > 0 && talents.length === 0) {
      prompt = `You mentioned ${interests.map(i => i.text).join(', ')}. What are you naturally good at? What skills do you have?`;
    } else if (talents.length > 0 && interests.length === 0) {
      prompt = `You're skilled at ${talents.map(t => t.text).join(', ')}. What interests you? What would you love to learn more about?`;
    } else if (activities.length > 0) {
      prompt = `You enjoy ${activities.map(a => a.text).join(', ')}. What draws you to these activities? What do you want to explore next?`;
    } else {
      prompt = "Tell me more! What else comes to mind? What excites you?";
    }

    setCurrentPrompt(prompt);
  }, [explorationItems]);

  // Check for suggestion box activation
  useEffect(() => {
    if (explorationItems.length < 3) return;

    const allText = explorationItems.map(item => item.text.toLowerCase()).join(' ');
    
    setSuggestionBoxes(prev => prev.map(box => {
      const matchCount = box.relatedItems.filter(item => 
        allText.includes(item.toLowerCase())
      ).length;
      
      const isActive = matchCount >= 2; // Activate when 2+ related items found
      
      return {
        ...box,
        isActive,
        relatedItems: box.relatedItems
      };
    }));
  }, [explorationItems]);

  const handleInputSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 800));

    const newItem: ExplorationItem = {
      id: `item-${Date.now()}`,
      text: text.trim(),
      type: determineItemType(text),
      confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0 confidence
      timestamp: new Date(),
      relatedItems: []
    };

    setExplorationItems(prev => [...prev, newItem]);
    setInputValue('');
    setIsProcessing(false);
    setShowSuccess(true);

    // Auto-hide success message
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const determineItemType = (text: string): 'interest' | 'talent' | 'activity' | 'concept' => {
    const lowerText = text.toLowerCase();
    
    // Talent indicators
    if (lowerText.includes('good at') || lowerText.includes('skilled') || 
        lowerText.includes('can') || lowerText.includes('able to') ||
        lowerText.includes('expert') || lowerText.includes('proficient')) {
      return 'talent';
    }
    
    // Activity indicators
    if (lowerText.includes('like to') || lowerText.includes('enjoy') ||
        lowerText.includes('love') || lowerText.includes('hate') ||
        lowerText.includes('always') || lowerText.includes('never')) {
      return 'activity';
    }
    
    // Concept indicators
    if (lowerText.includes('think') || lowerText.includes('believe') ||
        lowerText.includes('imagine') || lowerText.includes('wonder') ||
        lowerText.includes('dream') || lowerText.includes('vision')) {
      return 'concept';
    }
    
    // Default to interest
    return 'interest';
  };

  const handleSuggestionBoxClick = (box: SuggestionBox) => {
    if (!box.isActive) return;
    
    // Navigate to the specific exploration route
    navigate(box.route);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleInputSubmit(inputValue);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interest': return 'primary';
      case 'talent': return 'secondary';
      case 'activity': return 'success';
      case 'concept': return 'info';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interest': return <Lightbulb />;
      case 'talent': return <Star />;
      case 'activity': return <Work />;
      case 'concept': return <Psychology />;
      default: return <School />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Your Exploration Journey
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Share whatever comes to mind. No barriers, no rules. Just your authentic self.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We'll help you discover connections and suggest career paths that match your unique combination of interests and talents.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Input & Journey */}
        <Grid item xs={12} lg={8}>
          {/* Intelligent Prompt */}
          <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Lightbulb color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="h6" color="primary">
                {currentPrompt}
              </Typography>
            </Box>
          </Paper>

          {/* Input Area */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              What's on your mind?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <EnhancedTextField
                ref={inputRef}
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type anything... interests, talents, activities, thoughts..."
                disabled={isProcessing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputSubmit(inputValue)}
                        disabled={!inputValue.trim() || isProcessing}
                        color="primary"
                      >
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary">
                  Processing your input...
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Journey Container */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Journey So Far
            </Typography>
            <Box sx={{ minHeight: 200 }}>
              {explorationItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <School sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1">
                    Start your journey by sharing what interests you!
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {explorationItems.map((item, index) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                      <Card 
                        sx={{ 
                          position: 'relative',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 3,
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {getTypeIcon(item.type)}
                            <Chip 
                              label={item.type} 
                              size="small" 
                              color={getTypeColor(item.type) as any}
                              variant="outlined"
                            />
                          </Box>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {item.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.timestamp.toLocaleTimeString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Paper>

          {/* Success Message */}
          <Fade in={showSuccess}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Added to your journey! Keep exploring...
            </Alert>
          </Fade>
        </Grid>

        {/* Right Column - Suggestion Boxes */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Career Pathways
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {suggestionBoxes.map((box) => (
              <Zoom in={true} key={box.id}>
                <Card
                  sx={{
                    cursor: box.isActive ? 'pointer' : 'default',
                    opacity: box.isActive ? 1 : 0.6,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: box.isActive ? 'scale(1)' : 'scale(0.95)',
                    '&:hover': box.isActive ? {
                      transform: 'scale(1.02) translateY(-4px)',
                      boxShadow: 8,
                    } : {},
                  }}
                  onClick={() => handleSuggestionBoxClick(box)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box
                        sx={{
                          color: box.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: `${box.color}20`,
                        }}
                      >
                        {box.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                          {box.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {box.description}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {box.isActive && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                          ✨ Ready to explore!
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Click to dive deeper into this career path
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Zoom>
            ))}
          </Box>

          {/* Progress Indicator */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Journey Progress
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Items Added: {explorationItems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pathways Unlocked: {suggestionBoxes.filter(box => box.isActive).length}/5
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(suggestionBoxes.filter(box => box.isActive).length / 5) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/landing')}
        >
          Back to Landing
        </Button>
        
        {suggestionBoxes.some(box => box.isActive) && (
          <ForwardArrowButton
            size="large"
            onClick={() => navigate('/career-exploration')}
          >
            Explore Career Paths
          </ForwardArrowButton>
        )}
      </Box>
    </Container>
  );
};

export default ExplorationJourney;
