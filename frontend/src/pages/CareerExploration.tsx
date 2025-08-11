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
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Badge,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CareerProfile, CareerMatch, IndustrySector, SkillCategory, CareerLevel } from '../types';

// Mock data for demonstration
const mockCareerMatches: CareerMatch[] = [
  {
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
  },
  {
    career_id: '2',
    match_score: 87,
    reasoning: [
      'Good fit for your creative portfolio',
      'Matches your industry sector interests',
      'Aligns with your work environment preferences'
    ],
    skill_gaps: ['User research methods', 'Prototyping tools'],
    recommendations: [
      'Enroll in UX research courses',
      'Practice rapid prototyping',
      'Build user testing experience'
    ]
  },
  {
    career_id: '3',
    match_score: 78,
    reasoning: [
      'Matches some of your technical skills',
      'Good growth potential in your area',
      'UC has strong connections in this field'
    ],
    skill_gaps: ['Business acumen', 'Project management'],
    recommendations: [
      'Take business courses',
      'Join project management workshops',
      'Seek leadership opportunities'
    ]
  }
];

const mockCareers: CareerProfile[] = [
  {
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
      },
      {
        level: CareerLevel.MID_LEVEL,
        title: 'Product Designer',
        years_experience: 3,
        salary_range: { min: 65000, max: 90000 },
        key_responsibilities: ['Lead design projects', 'Collaborate with cross-functional teams'],
        required_skills: ['Project Management', 'User Research', 'Prototyping'],
        growth_opportunities: ['Mentor junior designers', 'Specialize in specific domains']
      }
    ],
    core_skills: [
      {
        skill_name: 'Design Thinking',
        category: SkillCategory.DESIGN,
        proficiency_level: 8,
        importance: 'critical',
        description: 'Ability to solve problems through design'
      },
      {
        skill_name: 'Sketching',
        category: SkillCategory.DESIGN,
        proficiency_level: 7,
        importance: 'critical',
        description: 'Quick visual communication of ideas'
      }
    ],
    specialized_skills: [],
    industry_sectors: ['consumer_electronics', 'consumer_goods'],
    market_demand: 'high',
    growth_potential: 'high',
    education_level: 'bachelor',
    certifications: [],
    continuing_education: ['Design conferences', 'Online courses'],
    typical_workplaces: ['Design agencies', 'Tech companies', 'Manufacturing firms'],
    work_schedule: 'full_time',
    travel_requirements: 'moderate',
    current_trends: [],
    future_outlook: 'positive',
    uc_programs: ['Industrial Design', 'Design', 'Architecture'],
    uc_alumni_examples: ['Sarah Chen - Apple', 'Mike Rodriguez - IDEO'],
    learning_resources: ['UC Design Library', 'Industry workshops', 'Online platforms'],
    professional_organizations: ['IDSA', 'AIGA'],
    networking_opportunities: ['UC Design Alumni Network', 'Industry meetups'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    popularity_score: 9.2
  },
  {
    id: '2',
    title: 'UX Designer',
    category: 'Design',
    description: 'Design user experiences that are intuitive, accessible, and delightful',
    career_paths: [],
    core_skills: [],
    specialized_skills: [],
    industry_sectors: ['consumer_electronics', 'software'],
    market_demand: 'very_high',
    growth_potential: 'very_high',
    education_level: 'bachelor',
    certifications: [],
    continuing_education: [],
    typical_workplaces: [],
    work_schedule: 'full_time',
    travel_requirements: 'minimal',
    current_trends: [],
    future_outlook: 'very_positive',
    uc_programs: ['Industrial Design', 'Computer Science'],
    uc_alumni_examples: [],
    learning_resources: [],
    professional_organizations: [],
    networking_opportunities: [],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    popularity_score: 9.5
  },
  {
    id: '3',
    title: 'Design Engineer',
    category: 'Engineering',
    description: 'Bridge the gap between design and engineering, ensuring manufacturability',
    career_paths: [],
    core_skills: [],
    specialized_skills: [],
    industry_sectors: ['automotive', 'aerospace'],
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
    uc_programs: ['Industrial Design', 'Mechanical Engineering'],
    uc_alumni_examples: [],
    learning_resources: [],
    professional_organizations: [],
    networking_opportunities: [],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    popularity_score: 8.8
  }
];

const CareerExploration: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState<CareerProfile | null>(null);
  const [filteredCareers, setFilteredCareers] = useState<CareerProfile[]>(mockCareers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([30000, 150000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCareerDialog, setShowCareerDialog] = useState(false);

  const handleCareerSelect = (career: CareerProfile) => {
    setSelectedCareer(career);
    setShowCareerDialog(true);
  };

  const handleFilterChange = () => {
    let filtered = mockCareers;

    if (searchTerm) {
      filtered = filtered.filter(career =>
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(career => career.category === selectedCategory);
    }

    if (selectedSector !== 'all') {
      filtered = filtered.filter(career => 
        career.industry_sectors.includes(selectedSector as IndustrySector)
      );
    }

    filtered = filtered.filter(career => {
      const avgSalary = career.career_paths.length > 0 
        ? (career.career_paths[0].salary_range.min + career.career_paths[0].salary_range.max) / 2
        : 50000;
      return avgSalary >= salaryRange[0] && avgSalary <= salaryRange[1];
    });

    setFilteredCareers(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchTerm, selectedCategory, selectedSector, salaryRange]);

  const getMatchScore = (careerId: string) => {
    const match = mockCareerMatches.find(m => m.career_id === careerId);
    return match ? match.match_score : 0;
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'primary';
    if (score >= 70) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Explore Your Career Paths
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Discover careers that match your interests, skills, and goals
        </Typography>
        
        {/* Search and Filters */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ minWidth: 300 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>

        {/* Filter Panel */}
        {showFilters && (
          <Paper sx={{ mt: 3, p: 3, maxWidth: 800, mx: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Management">Management</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Industry Sector</InputLabel>
                  <Select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    label="Industry Sector"
                  >
                    <MenuItem value="all">All Sectors</MenuItem>
                    <MenuItem value="consumer_electronics">Consumer Electronics</MenuItem>
                    <MenuItem value="automotive">Automotive</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="medical_devices">Medical Devices</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography gutterBottom>Salary Range</Typography>
                <Slider
                  value={salaryRange}
                  onChange={(_, value) => setSalaryRange(value as [number, number])}
                  valueLabelDisplay="auto"
                  min={30000}
                  max={150000}
                  step={5000}
                  valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>

      {/* Career Matches Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Your Top Career Matches
        </Typography>
        <Grid container spacing={3}>
          {mockCareerMatches.map((match) => {
            const career = mockCareers.find(c => c.id === match.career_id);
            if (!career) return null;
            
            return (
              <Grid item xs={12} md={4} key={match.career_id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                  }}
                  onClick={() => handleCareerSelect(career)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {career.title}
                      </Typography>
                      <Badge
                        badgeContent={match.match_score}
                        color={getMatchColor(match.match_score) as any}
                        sx={{ '& .MuiBadge-badge': { fontSize: '1rem', height: 28, minWidth: 28 } }}
                      >
                        <StarIcon color="primary" />
                      </Badge>
                    </Box>
                    
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {career.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Match Score: {match.match_score}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {match.reasoning[0]}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {career.industry_sectors.slice(0, 2).map((sector) => (
                        <Chip
                          key={sector}
                          label={sector.replace('_', ' ')}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {career.career_paths.length > 0 && 
                          `$${career.career_paths[0].salary_range.min.toLocaleString()} - $${career.career_paths[0].salary_range.max.toLocaleString()}`
                        }
                      </Typography>
                      <Chip
                        label={career.market_demand}
                        color={career.market_demand === 'high' ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* All Careers Section */}
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Explore All Careers ({filteredCareers.length})
        </Typography>
        <Grid container spacing={3}>
          {filteredCareers.map((career) => (
            <Grid item xs={12} md={6} lg={4} key={career.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                }}
                onClick={() => handleCareerSelect(career)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {career.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={career.popularity_score / 2} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {career.popularity_score.toFixed(1)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {career.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label={career.category} size="small" color="primary" />
                    {career.industry_sectors.slice(0, 2).map((sector) => (
                      <Chip
                        key={sector}
                        label={sector.replace('_', ' ')}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {career.career_paths.length > 0 && 
                        `${career.career_paths[0].title} level`
                      }
                    </Typography>
                    <Chip
                      label={career.growth_potential}
                      color={career.growth_potential === 'high' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Career Detail Dialog */}
      <Dialog
        open={showCareerDialog}
        onClose={() => setShowCareerDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCareer && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">{selectedCareer.title}</Typography>
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
                {selectedCareer.description}
              </Typography>

              <Grid container spacing={3}>
                {/* Career Paths */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Career Progression
                  </Typography>
                  {selectedCareer.career_paths.map((path, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {path.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {path.years_experience} years experience
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        ${path.salary_range.min.toLocaleString()} - ${path.salary_range.max.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {path.key_responsibilities.join(', ')}
                      </Typography>
                    </Paper>
                  ))}
                </Grid>

                {/* Skills and Requirements */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Required Skills
                  </Typography>
                  {selectedCareer.core_skills.map((skill, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {skill.skill_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {skill.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">Level: {skill.proficiency_level}/10</Typography>
                        <Chip 
                          label={skill.importance} 
                          size="small" 
                          color={skill.importance === 'critical' ? 'error' : 'default'}
                        />
                      </Box>
                    </Paper>
                  ))}
                </Grid>

                {/* UC Connections */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    UC Connections
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {selectedCareer.uc_programs.map((program) => (
                      <Chip key={program} label={program} color="primary" />
                    ))}
                  </Box>
                  {selectedCareer.uc_alumni_examples.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Alumni examples: {selectedCareer.uc_alumni_examples.join(', ')}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowCareerDialog(false)}>Close</Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  setShowCareerDialog(false);
                  navigate('/practice-project');
                }}
              >
                Start Practice Project
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Navigation */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/skills-suggestions')}
          sx={{ mr: 2 }}
        >
          Back to Skills
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/practice-project')}
        >
          Continue to Practice Projects
        </Button>
      </Box>
    </Box>
  );
};

export default CareerExploration;
