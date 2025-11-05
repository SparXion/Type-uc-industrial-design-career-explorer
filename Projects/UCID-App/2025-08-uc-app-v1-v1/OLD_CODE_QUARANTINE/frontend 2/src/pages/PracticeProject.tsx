import React, { useState, useEffect } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Rating,
  Tabs,
  Tab
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Info as InfoIcon,
  Star as StarIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PracticeProject as PracticeProjectType, CareerProfile } from '../types';

// Mock data for demonstration
const mockPracticeProjects: PracticeProjectType[] = [
  {
    id: '1',
    title: 'Sustainable Product Design Challenge',
    description: 'Design a sustainable product that addresses environmental concerns while maintaining functionality and aesthetics.',
    skills_focus: ['Design Thinking', 'Sustainability', 'Prototyping', 'User Research'],
    difficulty: 'Intermediate',
    estimated_duration: '2-3 weeks',
    materials_needed: ['Sketching materials', '3D modeling software', 'Prototyping tools', 'Research resources'],
    learning_objectives: [
      'Apply sustainable design principles',
      'Conduct user research and needs analysis',
      'Create functional prototypes',
      'Present design solutions effectively'
    ],
    submission_guidelines: [
      'Design brief and concept sketches',
      '3D models and renderings',
      'Prototype photos/videos',
      'Written reflection on sustainability aspects'
    ],
    feedback_criteria: [
      'Innovation and creativity',
      'Sustainability integration',
      'Technical execution',
      'Presentation quality'
    ]
  },
  {
    id: '2',
    title: 'User Experience Design Sprint',
    description: 'Complete a rapid UX design sprint to solve a real user problem in just one week.',
    skills_focus: ['UX Research', 'Prototyping', 'User Testing', 'Design Sprints'],
    difficulty: 'Advanced',
    estimated_duration: '1 week',
    materials_needed: ['Design software', 'Prototyping tools', 'User testing platform', 'Analytics tools'],
    learning_objectives: [
      'Execute a complete design sprint',
      'Conduct rapid user research',
      'Create and test prototypes quickly',
      'Iterate based on user feedback'
    ],
    submission_guidelines: [
      'Sprint documentation and process',
      'User research findings',
      'Prototype iterations',
      'User testing results and insights'
    ],
    feedback_criteria: [
      'Process efficiency',
      'User research quality',
      'Prototype effectiveness',
      'Iteration improvement'
    ]
  },
  {
    id: '3',
    title: 'Manufacturing Process Design',
    description: 'Design a manufacturing process for a complex product, considering efficiency, cost, and quality.',
    skills_focus: ['Manufacturing', 'Process Design', 'CAD Modeling', 'Cost Analysis'],
    difficulty: 'Intermediate',
    estimated_duration: '3-4 weeks',
    materials_needed: ['CAD software', 'Manufacturing knowledge', 'Cost analysis tools', 'Process mapping software'],
    learning_objectives: [
      'Understand manufacturing constraints',
      'Design efficient production processes',
      'Analyze cost implications',
      'Optimize for quality and efficiency'
    ],
    submission_guidelines: [
      'Process flow diagrams',
      'CAD models and technical drawings',
      'Cost analysis spreadsheet',
      'Process optimization recommendations'
    ],
    feedback_criteria: [
      'Process efficiency',
      'Cost effectiveness',
      'Technical accuracy',
      'Optimization quality'
    ]
  },
  {
    id: '4',
    title: 'Portfolio Enhancement Project',
    description: 'Create or enhance a professional portfolio piece that showcases your design skills and process.',
    skills_focus: ['Portfolio Design', 'Visual Communication', 'Storytelling', 'Professional Presentation'],
    difficulty: 'Beginner',
    estimated_duration: '1-2 weeks',
    materials_needed: ['Design software', 'Portfolio platform', 'High-quality images', 'Writing tools'],
    learning_objectives: [
      'Develop compelling portfolio content',
      'Communicate design process effectively',
      'Create professional presentation materials',
      'Build personal brand identity'
    ],
    submission_guidelines: [
      'Portfolio piece with process documentation',
      'Professional presentation materials',
      'Personal brand elements',
      'Reflection on portfolio development'
    ],
    feedback_criteria: [
      'Content quality',
      'Visual presentation',
      'Process documentation',
      'Professional polish'
    ]
  }
];

const mockCareerContext: CareerProfile = {
  id: '1',
  title: 'Product Designer',
  category: 'Design',
  description: 'Create innovative product designs that solve user problems and meet business objectives',
  career_paths: [],
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
  uc_alumni_examples: [],
  learning_resources: [],
  professional_organizations: [],
  networking_opportunities: [],
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  popularity_score: 9.2
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PracticeProject: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<PracticeProjectType | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [projectProgress, setProjectProgress] = useState<Record<string, number>>({});
  const [activeProjects, setActiveProjects] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);

  const handleProjectSelect = (project: PracticeProjectType) => {
    setSelectedProject(project);
    setShowProjectDialog(true);
  };

  const handleStartProject = (projectId: string) => {
    setActiveProjects(prev => [...prev, projectId]);
    setProjectProgress(prev => ({ ...prev, [projectId]: 0 }));
    setShowStartDialog(false);
    setShowProjectDialog(false);
  };

  const handleProjectProgress = (projectId: string, progress: number) => {
    setProjectProgress(prev => ({ ...prev, [projectId]: progress }));
    
    if (progress >= 100) {
      setActiveProjects(prev => prev.filter(id => id !== projectId));
      setCompletedProjects(prev => [...prev, projectId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getSkillsMatch = (projectSkills: string[]) => {
    // Mock skill matching logic
    const studentSkills = ['Design Thinking', 'Sketching', '3D Modeling', 'User Research'];
    const matches = projectSkills.filter(skill => studentSkills.includes(skill));
    return {
      matchCount: matches.length,
      totalSkills: projectSkills.length,
      matchPercentage: Math.round((matches.length / projectSkills.length) * 100)
    };
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Practice Projects
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Build your skills through hands-on projects designed for your career path
        </Typography>
        
        {/* Career Context */}
        <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <WorkIcon color="primary" />
            <Typography variant="h6">
              Recommended for: {mockCareerContext.title}
            </Typography>
          </Box>
          <Typography color="text.secondary">
            These projects are tailored to help you develop the skills needed for your target career path.
          </Typography>
        </Paper>
      </Box>

      {/* Active Projects Section */}
      {activeProjects.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Active Projects ({activeProjects.length})
          </Typography>
          <Grid container spacing={3}>
            {activeProjects.map((projectId) => {
              const project = mockPracticeProjects.find(p => p.id === projectId);
              const progress = projectProgress[projectId] || 0;
              
              if (!project) return null;
              
              return (
                <Grid item xs={12} md={6} key={projectId}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {project.title}
                        </Typography>
                        <Chip
                          label={`${progress}%`}
                          color={progress >= 100 ? 'success' : 'primary'}
                          size="small"
                        />
                      </Box>
                      
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Progress
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={progress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {project.skills_focus.slice(0, 3).map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {project.estimated_duration}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleProjectProgress(projectId, Math.min(progress + 25, 100))}
                        >
                          Update Progress
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Available Projects Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Available Projects ({mockPracticeProjects.length})
        </Typography>
        <Grid container spacing={3}>
          {mockPracticeProjects.map((project) => {
            const isActive = activeProjects.includes(project.id);
            const isCompleted = completedProjects.includes(project.id);
            const skillsMatch = getSkillsMatch(project.skills_focus);
            
            return (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: isActive || isCompleted ? 'default' : 'pointer',
                    opacity: isCompleted ? 0.7 : 1,
                    '&:hover': isActive || isCompleted ? {} : { transform: 'translateY(-4px)', boxShadow: 4 }
                  }}
                  onClick={() => !isActive && !isCompleted && handleProjectSelect(project)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {project.title}
                      </Typography>
                      {isCompleted && (
                        <CheckCircleIcon color="success" />
                      )}
                      {isActive && (
                        <PlayIcon color="primary" />
                      )}
                    </Box>
                    
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Skills Match: {skillsMatch.matchPercentage}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={skillsMatch.matchPercentage} 
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={project.difficulty}
                        color={getDifficultyColor(project.difficulty) as any}
                        size="small"
                      />
                      <Chip
                        label={project.estimated_duration}
                        size="small"
                        variant="outlined"
                        icon={<ScheduleIcon />}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {project.skills_focus.slice(0, 3).map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {project.skills_focus.length} skills focus
                      </Typography>
                      {!isActive && !isCompleted && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectSelect(project);
                          }}
                        >
                          Start Project
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Project Detail Dialog */}
      <Dialog
        open={showProjectDialog}
        onClose={() => setShowProjectDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">{selectedProject.title}</Typography>
                <Box>
                  <IconButton size="small">
                    <BookmarkIcon />
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                {selectedProject.description}
              </Typography>

              <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                <Tab label="Overview" />
                <Tab label="Requirements" />
                <Tab label="Submission" />
                <Tab label="Skills Focus" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Project Details
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Difficulty:</Typography>
                        <Chip
                          label={selectedProject.difficulty}
                          color={getDifficultyColor(selectedProject.difficulty) as any}
                          size="small"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Duration:</Typography>
                        <Typography variant="body2">{selectedProject.estimated_duration}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Skills Focus:</Typography>
                        <Typography variant="body2">{selectedProject.skills_focus.length} skills</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Materials Needed
                      </Typography>
                      <List dense>
                        {selectedProject.materials_needed.map((material, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={material} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Learning Objectives
                  </Typography>
                  <List>
                    {selectedProject.learning_objectives.map((objective, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={objective} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Submission Guidelines
                  </Typography>
                  <List>
                    {selectedProject.submission_guidelines.map((guideline, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <UploadIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={guideline} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Feedback Criteria
                  </Typography>
                  <List>
                    {selectedProject.feedback_criteria.map((criterion, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <StarIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={criterion} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Skills You'll Develop
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedProject.skills_focus.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="primary"
                        variant="outlined"
                        icon={<TrendingUpIcon />}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Skills Match Analysis
                    </Typography>
                    {(() => {
                      const match = getSkillsMatch(selectedProject.skills_focus);
                      return (
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Match Score: {match.matchPercentage}% ({match.matchCount}/{match.totalSkills} skills)
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={match.matchPercentage} 
                            sx={{ height: 8, borderRadius: 4, mb: 2 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            This project aligns well with your current skill set and will help you develop new competencies.
                          </Typography>
                        </Box>
                      );
                    })()}
                  </Box>
                </Paper>
              </TabPanel>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowProjectDialog(false)}>Close</Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  setShowStartDialog(true);
                }}
              >
                Start This Project
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Start Project Confirmation Dialog */}
      <Dialog
        open={showStartDialog}
        onClose={() => setShowStartDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Start Project</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you ready to start "{selectedProject?.title}"?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This project is estimated to take {selectedProject?.estimated_duration} and will help you develop skills in:
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedProject?.skills_focus.map((skill) => (
              <Chip key={skill} label={skill} size="small" />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowStartDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => selectedProject && handleStartProject(selectedProject.id)}
          >
            Start Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Navigation */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/career-exploration')}
          sx={{ mr: 2 }}
        >
          Back to Careers
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/wrap-up')}
        >
          Complete Journey
        </Button>
      </Box>
    </Box>
  );
};

export default PracticeProject;
