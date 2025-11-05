import React from 'react';
import { 
  TextField, 
  TextFieldProps, 
  InputAdornment, 
  IconButton, 
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  AutocompleteProps
} from '@mui/material';
import { 
  Search, 
  Visibility, 
  VisibilityOff, 
  Clear,
  CheckCircle,
  Error,
  Info
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Enhanced TextField with custom styling
export const EnhancedTextField: React.FC<TextFieldProps & { 
  showStatusIcon?: boolean;
  status?: 'success' | 'error' | 'info' | 'warning';
}> = ({ 
  showStatusIcon = false, 
  status, 
  ...props 
}) => {
  const getStatusIcon = () => {
    if (!showStatusIcon || !status) return null;
    
    switch (status) {
      case 'success':
        return <CheckCircle color="success" fontSize="small" />;
      case 'error':
        return <Error color="error" fontSize="small" />;
      case 'info':
        return <Info color="info" fontSize="small" />;
      case 'warning':
        return <Error color="warning" fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: showStatusIcon ? (
          <InputAdornment position="end">
            {getStatusIcon()}
          </InputAdornment>
        ) : props.InputProps?.endAdornment,
        ...props.InputProps,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          backgroundColor: 'background.paper',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&:hover': {
            backgroundColor: 'background.default',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.light',
              borderWidth: 2,
            },
          },
          
          '&.Mui-focused': {
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
          },
          
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'error.main',
              borderWidth: 2,
            },
          },
        },
        
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&.Mui-focused': {
            color: 'primary.main',
            fontWeight: 600,
          },
        },
        
        '& .MuiInputBase-input': {
          fontSize: '1rem',
          padding: '16px 20px',
        },
      }}
      {...props}
    />
  );
};

// Search input with search icon
export const SearchInput: React.FC<TextFieldProps> = (props) => (
  <EnhancedTextField
    placeholder="Search..."
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search color="action" />
        </InputAdornment>
      ),
      endAdornment: props.value ? (
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={() => {
              if (props.onChange) {
                props.onChange({ target: { value: '' } } as any);
              }
            }}
          >
            <Clear />
          </IconButton>
        </InputAdornment>
      ) : undefined,
    }}
    {...props}
  />
);

// Password input with visibility toggle
export const PasswordInput: React.FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <EnhancedTextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

// Enhanced Select component
export const EnhancedSelect: React.FC<SelectProps> = (props) => (
  <FormControl fullWidth>
    <InputLabel>{props.label}</InputLabel>
    <Select
      variant="outlined"
      {...props}
      sx={{
        borderRadius: 12,
        backgroundColor: 'background.paper',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'divider',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.light',
          borderWidth: 2,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
          borderWidth: 2,
        },
      }}
    />
  </FormControl>
);

// Tag input with chips
export const TagInput: React.FC<{
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}> = ({ value = [], onChange, placeholder = "Add tags...", maxTags = 10 }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleAddTag = (tag: string) => {
    if (tag && !value.includes(tag) && value.length < maxTags) {
      onChange([...value, tag]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box>
      <EnhancedTextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag(inputValue.trim());
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Chip 
                label={`${value.length}/${maxTags}`} 
                size="small" 
                color={value.length >= maxTags ? 'error' : 'default'}
              />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {value.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: 16,
              '& .MuiChip-deleteIcon': {
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.dark',
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Rating input
export const RatingInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}> = ({ value, onChange, max = 5, size = 'medium', showLabels = true }) => {
  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <Box>
      <Rating
        value={value}
        onChange={(_, newValue) => onChange(newValue || 0)}
        max={max}
        size={size}
        sx={{
          '& .MuiRating-iconFilled': {
            color: 'primary.main',
          },
          '& .MuiRating-iconHover': {
            color: 'primary.light',
          },
        }}
      />
      {showLabels && value > 0 && (
        <Box sx={{ mt: 1, color: 'text.secondary' }}>
          {labels[value - 1]}
        </Box>
      )}
    </Box>
  );
};

// Slider input
export const SliderInput: React.FC<{
  value: number | number[];
  onChange: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
}> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  marks = true,
  valueLabelDisplay = 'auto'
}) => (
  <Slider
    value={value}
    onChange={(_, newValue) => onChange(newValue)}
    min={min}
    max={max}
    step={step}
    marks={marks}
    valueLabelDisplay={valueLabelDisplay}
    sx={{
      color: 'primary.main',
      '& .MuiSlider-thumb': {
        width: 20,
        height: 20,
        '&:hover': {
          boxShadow: '0 0 0 8px rgba(44, 95, 45, 0.16)',
        },
      },
      '& .MuiSlider-track': {
        height: 4,
        borderRadius: 2,
      },
      '& .MuiSlider-rail': {
        height: 4,
        borderRadius: 2,
      },
    }}
  />
);

// Export all enhanced input components
export default {
  EnhancedTextField,
  SearchInput,
  PasswordInput,
  EnhancedSelect,
  TagInput,
  RatingInput,
  SliderInput,
};
