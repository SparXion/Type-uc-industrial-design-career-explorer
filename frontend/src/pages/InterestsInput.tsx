import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Container,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Business, 
  School,
  ArrowForward,
  ArrowBack
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

interface StudentInterests {
  design_fields: string[];
  creative_mediums: string[];
  industry_sectors: string[];
  project_types: string[];
}

const InterestsInput: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state, 
    dispatch, 
    updateStudent, 
    setLoading, 
    setError, 
    clearError,
    nextStep,
    createStudent
  } = useAppContext();
  
  const [activeStep, setActiveStep] = useState(0);
  const [interests, setInterests] = useState<StudentInterests>({
    design_fields: [],
    creative_mediums: [],
    industry_sectors: [],
    project_types: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize interests from context if available
  useEffect(() => {
    if (state.interests && Object.values(state.interests).some((arr: string[]) => arr.length > 0)) {
      setInterests(state.interests);
    }
  }, [state.interests]);

  // Create a default student profile if none exists
  useEffect(() => {
    const ensureStudentProfile = async () => {
      if (!state.currentStudent) {
        try {
          setLoading(true);
          clearError();
          
          // Create a default student profile
          const defaultStudentData = {
            uc_id: `UC${Date.now()}`, // Generate a temporary UC ID
            email: 'student@uc.edu', // Default email
            first_name: 'Student',
            last_name: 'User',
            major: 'Industrial Design',
            graduation_year: new Date().getFullYear() + 2, // Default to 2 years from now
            interests: {
              design_fields: [],
              creative_mediums: [],
              industry_sectors: [],
              project_types: []
            },
            skills: {
              technical_skills: [],
              soft_skills: [],
              design_skills: [],
              skill_levels: {}
            },
            career_preferences: {
              preferred_roles: [],
              work_environment: [],
              location_preferences: [],
              salary_expectations: { min: 40000, max: 80000 }
            },
            career_matches: [],
            skill_gaps: [],
            recommendations: [],
            practice_projects: [],
            exploration_history: [],
            profile_completion: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const response = await createStudent(defaultStudentData);
          
          if (response.data) {
            // Student profile created successfully
            console.log('Default student profile created:', response.data);
          } else {
            setError(response.error || 'Failed to create student profile. Please try refreshing the page.');
          }
        } catch (error) {
          setError('An error occurred while setting up your profile. Please try again.');
          console.error('Error creating student profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    ensureStudentProfile();
  }, [state.currentStudent, createStudent, setLoading, clearError, setError]);

  const steps = [
    'Design Fields',
    'Creative Mediums', 
    'Industry Sectors',
    'Project Types'
  ];

  const designFieldOptions = [
    'Product Design', 'Furniture Design', 'Automotive Design', 'Medical Device Design',
    'Consumer Electronics', 'Sustainable Design', 'Packaging Design', 'Fashion Accessories',
    'Architectural Products', 'Sports Equipment', 'Toys & Games', 'Industrial Equipment'
  ];

  const creativeMediumOptions = [
    'Sketching', '3D Modeling', 'Prototyping', 'Digital Design',
    'Physical Modeling', 'User Research', 'Design Thinking', 'Material Exploration',
    'Computer-Aided Design', 'Rendering', 'Animation', 'Photography'
  ];

  const industrySectorOptions = [
    'Consumer Electronics', 'Automotive', 'Furniture', 'Medical Devices',
    'Aerospace', 'Consumer Goods', 'Toys & Games', 'Sports Equipment',
    'Packaging', 'Sustainable Design', 'Fashion Accessories', 'Architectural Products'
  ];

  const projectTypeOptions = [
    'User Research', 'Concept Development', 'Prototyping', 'User Testing',
    'Manufacturing', 'Sustainability Analysis', 'Market Research', 'Brand Integration',
    'Ergonomics', 'Aesthetics', 'Functionality', 'Innovation'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleInterestChange = (field: keyof StudentInterests, value: string[]) => {
    const newInterests = {
      ...interests,
      [field]: value
    };
    setInterests(newInterests);
    
    // Update context immediately for real-time feedback
    dispatch({ type: 'UPDATE_STUDENT_INTERESTS', payload: newInterests });
  };

  const handleSubmit = async () => {
    if (!state.currentStudent) {
      setError('No student profile found. Please start from the beginning.');
      return;
    }

    try {
      setLoading(true);
      clearError();

      // Update student interests via API
      const response = await updateStudent(state.currentStudent.id!, { interests });
      
      if (response.data) {
        // Update context with new interests
        dispatch({ type: 'UPDATE_STUDENT_INTERESTS', payload: interests });
        
        // Show success message
        setShowSuccess(true);
        
        // Navigate to next page after a brief delay
        setTimeout(() => {
          navigate('/creative-outlets');
        }, 1500);
      } else {
        setError(response.error || 'Failed to save interests');
      }
    } catch (error) {
      setError('An error occurred while saving your interests. Please try again.');
      console.error('Error saving interests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner if API call is in progress
  if (state.loading) {
    return <LoadingSpinner />;
  }

  // Show error if there's an error state
  if (state.error) {
    return <ErrorDisplay error={state.error} onRetry={() => clearError()} />;
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What design fields interest you most?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select the areas of industrial design that excite you
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Design Fields</InputLabel>
              <Select
                multiple
                value={interests.design_fields}
                onChange={(e: SelectChangeEvent<string[]>) => 
                  handleInterestChange('design_fields', e.target.value as string[])
                }
                input={<OutlinedInput label="Design Fields" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {designFieldOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What creative mediums do you enjoy working with?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose the tools and methods you prefer for expressing your ideas
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Creative Mediums</InputLabel>
              <Select
                multiple
                value={interests.creative_mediums}
                onChange={(e: SelectChangeEvent<string[]>) => 
                  handleInterestChange('creative_mediums', e.target.value as string[])
                }
                input={<OutlinedInput label="Creative Mediums" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {creativeMediumOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Which industry sectors appeal to you?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select the industries where you'd like to make an impact
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Industry Sectors</InputLabel>
              <Select
                multiple
                value={interests.industry_sectors}
                onChange={(e: SelectChangeEvent<string[]>) => 
                  handleInterestChange('industry_sectors', e.target.value as string[])
                }
                input={<OutlinedInput label="Industry Sectors" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {industrySectorOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What types of projects do you enjoy?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose the project aspects that energize you most
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Project Types</InputLabel>
              <Select
                multiple
                value={interests.project_types}
                onChange={(e: SelectChangeEvent<string[]>) => 
                  handleInterestChange('project_types', e.target.value as string[])
                }
                input={<OutlinedInput label="Project Types" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {projectTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Tell Us About Your Interests
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Help us understand what drives your passion for industrial design
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            {renderStepContent(activeStep)}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            variant="outlined"
          >
            Back
          </Button>
          
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                endIcon={<ArrowForward />}
                size="large"
              >
                Continue to Creative Work
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward />}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>

        {/* Progress Summary */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Selections So Far:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary">
                Design Fields ({interests.design_fields.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {interests.design_fields.map((field) => (
                  <Chip key={field} label={field} size="small" />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="primary">
                Creative Mediums ({interests.creative_mediums.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {interests.creative_mediums.map((medium) => (
                  <Chip key={medium} label={medium} size="small" />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Success Snackbar */}
        <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
          <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Interests saved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default InterestsInput;
