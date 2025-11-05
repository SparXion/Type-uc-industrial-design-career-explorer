import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack,
  TrendingUp,
  Star,
  Work,
  AutoAwesome,
  Lightbulb,
  School,
  Business,
  Psychology,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { BackArrowButton, ForwardArrowButton } from '../components/ArrowButton';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  skills: string[];
  companies: string[];
  projects: string[];
  insights: string[];
}

const CareerExplorationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const careerPaths: Record<string, CareerPath> = {
    auto: {
      id: 'auto',
      title: 'Auto & Transportation Design',
      description: 'Design vehicles, mobility solutions, and transportation systems that shape how people move through the world.',
      icon: <TrendingUp />,
      color: '#FF6B35',
      skills: ['3D Modeling', 'Ergonomics', 'Aerodynamics', 'Materials Science', 'User Experience', 'Sustainability'],
      companies: ['Tesla', 'Ford', 'BMW', 'Toyota', 'Volkswagen', 'Rivian', 'Lucid Motors'],
      projects: ['Electric Vehicle Design', 'Autonomous Vehicle Interfaces', 'Sustainable Mobility', 'Urban Transportation'],
      insights: [
        'Focus on sustainability and electric vehicle technology',
        'Develop strong understanding of aerodynamics and materials',
        'Build portfolio with transportation-focused projects',
        'Network with automotive design professionals'
      ]
    },
    toy: {
      id: 'toy',
      title: 'Toys & Games Design',
      description: 'Create playful, engaging, and educational experiences that bring joy and learning to people of all ages.',
      icon: <Star />,
              color: '#E00122',
      skills: ['Creative Design', 'Child Psychology', 'Safety Standards', 'Prototyping', 'User Testing', 'Manufacturing'],
      companies: ['LEGO', 'Hasbro', 'Mattel', 'Fisher-Price', 'Melissa & Doug', 'Spin Master'],
      projects: ['Educational Toys', 'Interactive Games', 'Sustainable Play', 'Digital-Physical Integration'],
      insights: [
        'Understand child development and safety requirements',
        'Focus on creativity and imagination in design',
        'Build portfolio with diverse toy and game concepts',
        'Stay updated on safety standards and regulations'
      ]
    },
    footwear: {
      id: 'footwear',
      title: 'Footwear & Fashion Design',
      description: 'Design comfortable, stylish, and functional footwear that combines aesthetics with performance.',
      icon: <Work />,
      color: '#2196F3',
      skills: ['Pattern Making', 'Material Selection', 'Ergonomics', 'Trend Analysis', 'Prototyping', 'Manufacturing'],
      companies: ['Nike', 'Adidas', 'New Balance', 'Vans', 'Converse', 'Under Armour', 'Allbirds'],
      projects: ['Athletic Footwear', 'Sustainable Materials', 'Custom Fitting', 'Performance Enhancement'],
      insights: [
        'Focus on comfort and performance alongside style',
        'Develop expertise in materials and manufacturing',
        'Build portfolio with diverse footwear concepts',
        'Stay current with fashion and athletic trends'
      ]
    },
    concept: {
      id: 'concept',
      title: 'Concept Art & Visual Design',
      description: 'Create compelling visual narratives and concept designs that bring ideas to life through artistic expression.',
      icon: <AutoAwesome />,
      color: '#9C27B0',
      skills: ['Digital Art', 'Sketching', 'Color Theory', 'Composition', 'Storytelling', 'Software Proficiency'],
      companies: ['Pixar', 'Disney', 'Industrial Light & Magic', 'Weta Digital', 'Blizzard Entertainment', 'Riot Games'],
      projects: ['Character Design', 'Environment Concepts', 'Product Visualization', 'Brand Identity'],
      insights: [
        'Develop strong foundational art skills',
        'Master digital tools and software',
        'Build portfolio with diverse concept art',
        'Network with entertainment and gaming industries'
      ]
    },
    product: {
      id: 'product',
      title: 'Product Design & Innovation',
      description: 'Design innovative products that solve real problems and enhance people\'s lives through thoughtful design.',
      icon: <Lightbulb />,
      color: '#FF9800',
      skills: ['Design Thinking', 'User Research', 'Prototyping', 'Manufacturing', 'Sustainability', 'Business Acumen'],
      companies: ['Apple', 'IDEO', 'Frog Design', 'Pentagram', 'Smart Design', 'Continuum'],
      projects: ['Consumer Electronics', 'Medical Devices', 'Sustainable Products', 'Social Impact Design'],
      insights: [
        'Focus on user-centered design and problem-solving',
        'Develop strong prototyping and testing skills',
        'Build portfolio with innovative product concepts',
        'Understand business and manufacturing constraints'
      ]
    }
  };

  const currentCareer = careerPaths[category || 'product'];

  if (!currentCareer) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Career path not found</Typography>
        <Button onClick={() => navigate('/exploration-journey')}>Back to Exploration</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              color: currentCareer.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: `${currentCareer.color}20`,
              mr: 3,
            }}
          >
            {React.cloneElement(currentCareer.icon as React.ReactElement, { sx: { fontSize: 40 } })}
          </Box>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
            {currentCareer.title}
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          {currentCareer.description}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Skills & Companies */}
        <Grid item xs={12} lg={6}>
          {/* Key Skills */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <School color="primary" />
              Key Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {currentCareer.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Paper>

          {/* Top Companies */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Business color="primary" />
              Top Companies
            </Typography>
            <List>
              {currentCareer.companies.map((company) => (
                <ListItem key={company} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <TrendingUp color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={company} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Projects & Insights */}
        <Grid item xs={12} lg={6}>
          {/* Project Types */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Work color="primary" />
              Project Types
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {currentCareer.projects.map((project) => (
                <Chip
                  key={project}
                  label={project}
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Paper>

          {/* Career Insights */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Psychology color="primary" />
              Career Insights
            </Typography>
            <List>
              {currentCareer.insights.map((insight, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Lightbulb color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={insight} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Ready to dive deeper into {currentCareer.title}?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore specific projects, connect with professionals, and start building your portfolio in this exciting field.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <ForwardArrowButton size="large">
            Explore Projects
          </ForwardArrowButton>
          <Button variant="outlined" size="large">
            Connect with Professionals
          </Button>
        </Box>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
        <BackArrowButton
          size="large"
          onClick={() => navigate('/exploration-journey')}
        >
          Back to Exploration
        </BackArrowButton>
        
        <Button
          variant="outlined"
          onClick={() => navigate('/career-exploration')}
        >
          View All Career Paths
        </Button>
      </Box>
    </Container>
  );
};

export default CareerExplorationDetail;
