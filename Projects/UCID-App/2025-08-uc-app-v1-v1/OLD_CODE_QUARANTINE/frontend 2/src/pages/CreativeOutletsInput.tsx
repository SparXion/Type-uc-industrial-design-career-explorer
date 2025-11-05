import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Chip,
  IconButton,
  Container,
  LinearProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  CloudUpload, 
  Delete, 
  Add, 
  ArrowForward,
  ArrowBack,
  Image,
  Description
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface CreativeWork {
  id: string;
  file: File;
  preview: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

const CreativeOutletsInput: React.FC = () => {
  const navigate = useNavigate();
  const [creativeWorks, setCreativeWorks] = useState<CreativeWork[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newWorks = acceptedFiles.map((file, index) => ({
      id: `work-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ''),
      description: '',
      tags: [],
      category: 'sketch'
    }));
    
    setCreativeWorks(prev => [...prev, ...newWorks]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp'],
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const handleWorkUpdate = (id: string, field: keyof CreativeWork, value: any) => {
    setCreativeWorks(prev => 
      prev.map(work => 
        work.id === id ? { ...work, [field]: value } : work
      )
    );
  };

  const handleWorkDelete = (id: string) => {
    setCreativeWorks(prev => {
      const work = prev.find(w => w.id === id);
      if (work) {
        URL.revokeObjectURL(work.preview);
      }
      return prev.filter(w => w.id !== id);
    });
  };

  const handleSubmit = async () => {
    if (creativeWorks.length === 0) {
      alert('Please upload at least one creative work');
      return;
    }

    setUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Here you would typically upload to your backend
    console.log('Creative works to upload:', creativeWorks);
    
    setUploading(false);
    navigate('/skills-suggestions');
  };

  const categoryOptions = [
    'sketch', '3d_model', 'prototype', 'rendering', 'photography', 'concept_art'
  ];

  const tagSuggestions = [
    'automotive', 'furniture', 'electronics', 'medical', 'sustainable', 'ergonomic',
    'minimalist', 'innovative', 'user-centered', 'aesthetic', 'functional'
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Share Your Creative Work
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Upload your sketches, models, and projects to help us understand your creative style
          </Typography>
        </Box>

        {/* Upload Area */}
        <Paper 
          {...getRootProps()} 
          sx={{ 
            p: 4, 
            mb: 4, 
            textAlign: 'center',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            backgroundColor: isDragActive ? 'primary.50' : 'background.paper',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop your files here' : 'Drag & drop files here, or click to select'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Supported formats: JPG, PNG, GIF, PDF (Max 10MB per file)
          </Typography>
          <Button variant="outlined" startIcon={<Add />}>
            Select Files
          </Button>
        </Paper>

        {/* Upload Progress */}
        {uploading && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Processing your creative work...
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {uploadProgress}% complete
            </Typography>
          </Paper>
        )}

        {/* Creative Works Grid */}
        {creativeWorks.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Your Creative Portfolio ({creativeWorks.length} items)
            </Typography>
            
            <Grid container spacing={3}>
              {creativeWorks.map((work) => (
                <Grid item xs={12} sm={6} md={4} key={work.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={work.preview}
                      alt={work.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <TextField
                          fullWidth
                          label="Title"
                          value={work.title}
                          onChange={(e) => handleWorkUpdate(work.id, 'title', e.target.value)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleWorkDelete(work.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                      
                      <TextField
                        fullWidth
                        label="Description"
                        value={work.description}
                        onChange={(e) => handleWorkUpdate(work.id, 'description', e.target.value)}
                        multiline
                        rows={2}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      
                      <TextField
                        select
                        fullWidth
                        label="Category"
                        value={work.category}
                        onChange={(e) => handleWorkUpdate(work.id, 'category', e.target.value)}
                        size="small"
                        sx={{ mb: 2 }}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </TextField>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Tags (click to add):
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {tagSuggestions.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant={work.tags.includes(tag) ? "filled" : "outlined"}
                              color={work.tags.includes(tag) ? "primary" : "default"}
                              onClick={() => {
                                const newTags = work.tags.includes(tag)
                                  ? work.tags.filter(t => t !== tag)
                                  : [...work.tags, tag];
                                handleWorkUpdate(work.id, 'tags', newTags);
                              }}
                              sx={{ cursor: 'pointer' }}
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      {work.tags.length > 0 && (
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Selected tags:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {work.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                color="primary"
                                onDelete={() => {
                                  const newTags = work.tags.filter(t => t !== tag);
                                  handleWorkUpdate(work.id, 'tags', newTags);
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/interests')}
            startIcon={<ArrowBack />}
          >
            Back to Interests
          </Button>
          
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={creativeWorks.length === 0 || uploading}
            endIcon={<ArrowForward />}
            size="large"
          >
            {uploading ? 'Processing...' : 'Continue to Skills Analysis'}
          </Button>
        </Box>

        {/* Tips */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            💡 Tips for Better Results
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                • Include a variety of work types (sketches, 3D models, prototypes)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Add descriptive titles and tags to help AI understand your work
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                • Show your creative process from concept to final design
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Include work that demonstrates different skills and techniques
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreativeOutletsInput;
