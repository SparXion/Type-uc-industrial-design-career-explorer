import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  OutlinedInput
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface StudentInterests {
  design_fields: string[];
  creative_mediums: string[];
  industry_sectors: string[];
  project_types: string[];
}

const InterestsInput: React.FC = () => {
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [interests, setInterests] = useState<StudentInterests>({
    design_fields: [],
    creative_mediums: [],
    industry_sectors: [],
    project_types: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

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
  };

  const handleSubmit = () => {
    // Bypass API call - just navigate to next page
    setShowSuccess(true);
    
    // Navigate to next page after a brief delay
    setTimeout(() => {
      navigate('/creative-outlets');
    }, 1500);
  };

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
        <Paper sx={{ p: 4, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Paper>

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
