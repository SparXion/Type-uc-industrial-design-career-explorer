import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Badge,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box as MuiBox,
  IconButton,
  Tooltip,
  Rating,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Star as StarIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Event as EventIcon,
  LibraryBooks as LibraryBooksIcon,
  PlayArrow as PlayArrowIcon,
  Flag as FlagIcon,
  EmojiEvents as EmojiEventsIcon,
  Psychology as PsychologyIcon,
  Business as BusinessIcon,
  DesignServices as DesignServicesIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CareerProfile, CareerMatch, PracticeProject as PracticeProjectType } from '../types';
import { CareerLevel } from '../types';

// Mock data for demonstration
const mockCareerMatch: CareerMatch = {
  career_id: '1',
  match_score: 92,
  reasoning: [
    'Strong alignment with your design interests',
    'Your sketching skills match core requirements',
    'Your project preferences align with typical work'
  ],
  skill_gaps: ['Advanced 3D modeling', 'Manufacturing processes'],
  recommendations: [
    'Take advanced SolidWorks courses',
    'Join UC\'s manufacturing lab',
    'Participate in industry projects'
  ]
};

const mockCareer: CareerProfile = {
  id: '1',
  title: 'Product Designer',
  category: 'Design',
  description: 'Create innovative product designs that solve user problems and meet business objectives',
  career_paths: [
    {
      level: CareerLevel.ENTRY,
      title: 'Junior Product Designer',
      years_experience: 0,
      salary_range: { min: 45000, max: 65000 },
      key_responsibilities: ['Assist with design projects', 'Create sketches and mockups'],
      required_skills: ['Sketching', '3D Modeling', 'Design Thinking'],
      growth_opportunities: ['Lead small projects', 'Develop specialized skills']
    }
  ],
  core_skills: [],
  specialized_skills: [],
  industry_sectors: ['consumer_electronics', 'consumer_goods'],
  market_demand: 'high',
  growth_potential: 'high',
  education_level: 'bachelor',
  certifications: [],
  continuing_education: [],
  typical_workplaces: [],
  work_schedule: 'full_time',
  travel_requirements: 'moderate',
  current_trends: [],
  future_outlook: 'positive',
  uc_programs: ['Industrial Design', 'Design', 'Architecture'],
  uc_alumni_examples: ['Sarah Chen - Apple', 'Mike Rodriguez - IDEO'],
  learning_resources: [],
  professional_organizations: [],
  networking_opportunities: [],
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  popularity_score: 9.2
};

const mockCompletedProjects: PracticeProjectType[] = [
  {
    id: '1',
    title: 'Sustainable Product Design Challenge',
    description: 'Design a sustainable product that addresses environmental concerns while maintaining functionality and aesthetics.',
    skills_focus: ['Design Thinking', 'Sustainability', 'Prototyping', 'User Research'],
    difficulty: 'Intermediate',
    estimated_duration: '2-3 weeks',
    materials_needed: [],
    learning_objectives: [],
    submission_guidelines: [],
    feedback_criteria: []
  }
];

const mockNextSteps = [
  {
    title: 'Enroll in Advanced Courses',
    description: 'Take the next level of design and engineering courses at UC',
    timeline: 'Next semester',
    priority: 'high',
    resources: ['UC Course Catalog', 'Academic Advisor Meeting', 'Department Resources']
  },
  {
    title: 'Join UC Design Lab',
    description: 'Participate in hands-on design projects and research',
    timeline: 'Within 2 weeks',
    priority: 'high',
    resources: ['Lab Application', 'Faculty Introduction', 'Project Proposals']
  },
  {
    title: 'Build Professional Network',
    description: 'Connect with UC alumni and industry professionals',
    timeline: 'Ongoing',
    priority: 'medium',
    resources: ['UC Alumni Network', 'LinkedIn Connections', 'Industry Events']
  },
  {
    title: 'Develop Portfolio',
    description: 'Create a comprehensive portfolio showcasing your work',
    timeline: '3 months',
    priority: 'medium',
    resources: ['Portfolio Workshop', 'Design Software', 'Photography Equipment']
  }
];

const mockResources = {
  uc_programs: [
    'Industrial Design Advanced Studio',
    'Manufacturing Processes',
    'User Experience Design',
    'Sustainable Design Principles'
  ],
  industry_connections: [
    'UC Design Alumni Network',
    'Cincinnati Design Community',
    'Ohio Design Association',
    'National Industrial Design Society'
  ],
  learning_platforms: [
    'UC Library Resources',
    'Online Design Courses',
    'Industry Publications',
    'Design Conferences'
  ],
  mentorship: [
    'Faculty Office Hours',
    'Alumni Mentorship Program',
    'Industry Professional Network',
    'Peer Study Groups'
  ]
};

const WrapUp: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('panel1');

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const steps = [
    'Interests & Skills Assessment',
    'Creative Portfolio Review',
    'Career Path Analysis',
    'Practice Project Completion',
    'Next Steps Planning'
  ];

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          🎉 Journey Complete!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Congratulations on completing your career exploration journey! Here's your personalized summary and next steps.
        </Typography>
        
        {/* Progress Stepper */}
        <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mb: 3 }}>
          <Stepper activeStep={4} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>

      {/* Journey Summary */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Your Journey Summary
        </Typography>
        <Grid container spacing={3}>
          {/* Career Match */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <WorkIcon color="primary" />
                  <Typography variant="h6">
                    Top Career Match
                  </Typography>
                </Box>
                
                <Typography variant="h5" gutterBottom>
                  {mockCareer.title}
                </Typography>
                
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {mockCareer.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Badge
                    badgeContent={mockCareerMatch.match_score}
                    color="success"
                    sx={{ '& .MuiBadge-badge': { fontSize: '1.2rem', height: 32, minWidth: 32 } }}
                  >
                    <StarIcon color="primary" sx={{ fontSize: 32 }} />
                  </Badge>
                  <Typography variant="h6">
                    {mockCareerMatch.match_score}% Match
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {mockCareer.industry_sectors.map((sector) => (
                    <Chip
                      key={sector}
                      label={sector.replace('_', ' ')}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  Market Demand: <Chip label={mockCareer.market_demand} color="success" size="small" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Skills Development */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <TrendingUpIcon color="primary" />
                  <Typography variant="h6">
                    Skills Development
                  </Typography>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Skills to Focus On
                </Typography>
                
                <List dense>
                  {mockCareerMatch.skill_gaps.map((skill, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <PsychologyIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Your Strengths
                </Typography>
                
                <List dense>
                  {mockCareerMatch.reasoning.map((reason, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={reason} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Completed Projects */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Projects Completed
        </Typography>
        <Grid container spacing={3}>
          {mockCompletedProjects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <AssignmentIcon color="success" />
                    <Typography variant="h6">
                      {project.title}
                    </Typography>
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip
                      label={project.difficulty}
                      color="warning"
                      size="small"
                    />
                    <Chip
                      label={project.estimated_duration}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Skills Developed:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.skills_focus.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Next Steps */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Your Next Steps
        </Typography>
        <Grid container spacing={3}>
          {mockNextSteps.map((step, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {step.title}
                    </Typography>
                    <Chip
                      label={step.priority}
                      color={getPriorityColor(step.priority) as any}
                      size="small"
                    />
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Timeline: {step.timeline}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Resources:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {step.resources.map((resource) => (
                      <Chip
                        key={resource}
                        label={resource}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Resources & Connections */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Resources & Connections
        </Typography>
        
        <Accordion expanded={expandedAccordion === 'panel1'} onChange={handleAccordionChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SchoolIcon color="primary" />
              <Typography variant="h6">UC Programs & Courses</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {mockResources.uc_programs.map((program, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">{program}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedAccordion === 'panel2'} onChange={handleAccordionChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <GroupIcon color="primary" />
              <Typography variant="h6">Industry Connections</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {mockResources.industry_connections.map((connection, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">{connection}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedAccordion === 'panel3'} onChange={handleAccordionChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LibraryBooksIcon color="primary" />
              <Typography variant="h6">Learning Resources</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {mockResources.learning_platforms.map((platform, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">{platform}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedAccordion === 'panel4'} onChange={handleAccordionChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DesignServicesIcon color="primary" />
              <Typography variant="h6">Mentorship & Support</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {mockResources.mentorship.map((option, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">{option}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Action Items */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Take Action Today
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <EmailIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Schedule Advisor Meeting
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Meet with your academic advisor to plan your course schedule
                </Typography>
                <Button variant="contained" fullWidth>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <LinkedInIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Connect with Alumni
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Join the UC Design Alumni Network on LinkedIn
                </Typography>
                <Button variant="contained" fullWidth>
                  Join Network
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <EventIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Attend Design Events
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Find upcoming design workshops and industry events
                </Typography>
                <Button variant="contained" fullWidth>
                  Browse Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Success Celebration */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <EmojiEventsIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            You're Ready for Success!
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            You've completed a comprehensive career exploration journey and now have a clear path forward.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Remember: Your journey doesn't end here. Continue building your skills, expanding your network, and pursuing your passion for design.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main' }}>
              Download Summary
            </Button>
            <Button variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white' }}>
              Share Journey
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Navigation */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/practice-project')}
          sx={{ mr: 2 }}
        >
          Back to Projects
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
        >
          Start New Journey
        </Button>
      </Box>
    </Box>
  );
};

export default WrapUp;
