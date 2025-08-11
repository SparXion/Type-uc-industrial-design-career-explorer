import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  School, 
  Work, 
  Psychology,
  ArrowForward,
  ArrowBack,
  ExpandMore,
  Star,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material';

interface SkillGap {
  skill_name: string;
  category: string;
  importance: string;
  current_level: number;
  target_level: number;
  gap_size: number;
  learning_path: string[];
}

interface CareerMatch {
  career_id: string;
  title: string;
  match_score: number;
  reasoning: string[];
  skill_gaps: string[];
  recommendations: string[];
}

interface LearningRecommendation {
  title: string;
  description: string;
  skill_focus: string[];
  format: string;
  duration: string;
  difficulty: string;
  priority: number;
}

const SkillsSuggestions: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock data - in real app this would come from AI analysis
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([
    {
      career_id: '1',
      title: 'Product Designer',
      match_score: 87,
      reasoning: [
        'Strong interest in consumer electronics and furniture design',
        'Excellent sketching and 3D modeling skills demonstrated',
        'Creative approach to user-centered design problems'
      ],
      skill_gaps: ['Business acumen', 'Project management', 'Manufacturing processes'],
      recommendations: [
        'Take business courses to understand market dynamics',
        'Practice leading design projects in teams',
        'Learn about manufacturing constraints and processes'
      ]
    },
    {
      career_id: '2',
      title: 'UX Designer',
      match_score: 82,
      reasoning: [
        'Strong user research and prototyping skills',
        'Interest in human-centered design approaches',
        'Creative problem-solving demonstrated in portfolio'
      ],
      skill_gaps: ['Digital prototyping tools', 'User testing methodologies', 'Design systems'],
      recommendations: [
        'Master Figma and other digital design tools',
        'Learn formal user testing and research methods',
        'Study design system principles and implementation'
      ]
    }
  ]);

  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([
    {
      skill_name: 'Business Acumen',
      category: 'business',
      importance: 'important',
      current_level: 3,
      target_level: 7,
      gap_size: 4,
      learning_path: [
        'Take business fundamentals course',
        'Read industry publications',
        'Network with business professionals'
      ]
    },
    {
      skill_name: 'Project Management',
      category: 'leadership',
      importance: 'important',
      current_level: 2,
      target_level: 6,
      gap_size: 4,
      learning_path: [
        'Lead small design projects',
        'Take project management certification',
        'Practice with project management tools'
      ]
    }
  ]);

  const [learningRecommendations, setLearningRecommendations] = useState<LearningRecommendation[]>([
    {
      title: 'Business Fundamentals for Designers',
      description: 'Learn essential business concepts to better understand market needs and constraints',
      skill_focus: ['Business acumen', 'Market research', 'Financial literacy'],
      format: 'Online Course',
      duration: '8 weeks',
      difficulty: 'Intermediate',
      priority: 1
    },
    {
      title: 'Project Management in Design',
      description: 'Master the skills needed to lead design projects and teams effectively',
      skill_focus: ['Project management', 'Leadership', 'Communication'],
      format: 'Workshop',
      duration: '2 days',
      difficulty: 'Beginner',
      priority: 2
    }
  ]);

  useEffect(() => {
    // Simulate AI analysis process
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setLoading(false);
          setAnalysisComplete(true);
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'error';
      case 'important': return 'warning';
      case 'nice_to_have': return 'info';
      default: return 'default';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return <Warning color="error" />;
      case 'important': return <Info color="warning" />;
      case 'nice_to_have': return <Info color="info" />;
      default: return <Info />;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            🤖 AI Analysis in Progress
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Analyzing your interests and creative work...
          </Typography>
          
          <Paper sx={{ p: 4, mb: 4 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 8 }} />
            <Typography variant="body1">
              {progress}% Complete
            </Typography>
          </Paper>
          
          <Typography variant="body2" color="text.secondary">
            Our AI is analyzing your design interests, creative portfolio, and career goals to provide personalized recommendations.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            🎯 Your Personalized Career Insights
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Based on your interests and creative work, here's what we discovered
          </Typography>
        </Box>

        {/* Career Matches */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            🚀 Top Career Matches
          </Typography>
          
          <Grid container spacing={3}>
            {careerMatches.map((career, index) => (
              <Grid item xs={12} md={6} key={career.career_id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="h3">
                        {career.title}
                      </Typography>
                      <Chip 
                        label={`${career.match_score}% Match`}
                        color="primary"
                        variant="filled"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Why this career fits you:
                    </Typography>
                    
                    <List dense>
                      {career.reasoning.map((reason, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={reason} />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Areas for Growth:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {career.skill_gaps.map((gap, idx) => (
                        <Chip key={idx} label={gap} size="small" variant="outlined" />
                      ))}
                    </Box>
                    
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Recommendations:
                    </Typography>
                    <List dense>
                      {career.recommendations.map((rec, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <Star color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={rec} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Skill Gaps Analysis */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            📊 Skill Gap Analysis
          </Typography>
          
          <Grid container spacing={3}>
            {skillGaps.map((gap, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="h3">
                        {gap.skill_name}
                      </Typography>
                      <Chip 
                        icon={getImportanceIcon(gap.importance)}
                        label={gap.importance}
                        color={getImportanceColor(gap.importance)}
                        variant="outlined"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Category: {gap.category}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Current Level: {gap.current_level}/10
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={gap.current_level * 10} 
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Target Level: {gap.target_level}/10
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={gap.target_level * 10} 
                        color="primary"
                      />
                    </Box>
                    
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Learning Path:
                    </Typography>
                    <List dense>
                      {gap.learning_path.map((step, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <School color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Learning Recommendations */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            📚 Recommended Learning Opportunities
          </Typography>
          
          <Grid container spacing={3}>
            {learningRecommendations.map((rec, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3">
                        {rec.title}
                      </Typography>
                      <Chip 
                        label={`Priority ${rec.priority}`}
                        color={rec.priority === 1 ? "error" : "warning"}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {rec.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Skills Developed:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {rec.skill_focus.map((skill, idx) => (
                          <Chip key={idx} label={skill} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Format:</strong> {rec.format}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Duration:</strong> {rec.duration}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Difficulty:</strong> {rec.difficulty}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/creative-outlets')}
            startIcon={<ArrowBack />}
          >
            Back to Creative Work
          </Button>
          
          <Button
            variant="contained"
            onClick={() => navigate('/career-exploration')}
            endIcon={<ArrowForward />}
            size="large"
          >
            Explore Career Paths
          </Button>
        </Box>

        {/* Next Steps */}
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Next Steps
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                • Review your top career matches and skill gaps
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Start with the highest priority learning recommendations
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                • Explore detailed career paths and requirements
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Connect with companies that match your interests
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default SkillsSuggestions;
