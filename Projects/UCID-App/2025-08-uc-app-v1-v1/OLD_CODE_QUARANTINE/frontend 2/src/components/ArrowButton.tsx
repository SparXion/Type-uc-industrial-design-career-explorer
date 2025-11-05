import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { 
  KeyboardArrowRight, 
  KeyboardArrowLeft, 
  KeyboardArrowUp, 
  KeyboardArrowDown,
  ArrowForward,
  ArrowBack,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';

// Styled arrow button with custom styling
const StyledArrowButton = styled(Button)<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }>(({ theme, arrowSize = 'medium' }) => ({
  borderRadius: 12,
  padding: arrowSize === 'small' ? '8px 16px' : arrowSize === 'medium' ? '12px 24px' : '16px 32px',
  minWidth: 'auto',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  // Arrow icon styling
  '& .MuiSvgIcon-root': {
    fontSize: arrowSize === 'small' ? '20px' : arrowSize === 'medium' ? '24px' : '32px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Hover effects
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    },
  },
  
  // Active state
  '&:active': {
    transform: 'translateY(0)',
    transition: 'transform 0.1s ease-out',
  },
  
  // Focus state
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

// Right arrow button
export const RightArrowButton: React.FC<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }> = ({ 
  children, 
  arrowSize = 'medium', 
  ...props 
}) => (
  <StyledArrowButton
    variant="contained"
    arrowSize={arrowSize}
    endIcon={<KeyboardArrowRight />}
    {...props}
  >
    {children}
  </StyledArrowButton>
);

// Left arrow button
export const LeftArrowButton: React.FC<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }> = ({ 
  children, 
  arrowSize = 'medium', 
  ...props 
}) => (
  <StyledArrowButton
    variant="outlined"
    arrowSize={arrowSize}
    startIcon={<KeyboardArrowLeft />}
    {...props}
  >
    {children}
  </StyledArrowButton>
);

// Up arrow button
export const UpArrowButton: React.FC<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }> = ({ 
  children, 
  arrowSize = 'medium', 
  ...props 
}) => (
  <StyledArrowButton
    variant="contained"
    arrowSize={arrowSize}
    endIcon={<KeyboardArrowUp />}
    {...props}
  >
    {children}
  </StyledArrowButton>
);

// Down arrow button
export const DownArrowButton: React.FC<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }> = ({ 
  children, 
  arrowSize = 'medium', 
  ...props 
}) => (
  <StyledArrowButton
    variant="outlined"
    arrowSize={arrowSize}
    startIcon={<KeyboardArrowDown />}
    {...props}
  >
    {children}
  </StyledArrowButton>
);

// Forward arrow button (larger, more prominent)
export const ForwardArrowButton: React.FC<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }> = ({ 
  children, 
  arrowSize = 'medium', 
  ...props 
}) => (
  <StyledArrowButton
    variant="contained"
    arrowSize={arrowSize}
    endIcon={<ArrowForward />}
    sx={{
              background: 'linear-gradient(135deg, #E00122 0%, #B3001B 100%)',
      '&:hover': {
                  background: 'linear-gradient(135deg, #B3001B 0%, #E00122 100%)',
      },
    }}
    {...props}
  >
    {children}
  </StyledArrowButton>
);

// Back arrow button
export const BackArrowButton: React.FC<ButtonProps & { arrowSize?: 'small' | 'medium' | 'large' }> = ({ 
  children, 
  arrowSize = 'medium', 
  ...props 
}) => (
  <StyledArrowButton
    variant="outlined"
    arrowSize={arrowSize}
    startIcon={<ArrowBack />}
    {...props}
  >
    {children}
  </StyledArrowButton>
);

// Circular arrow button for navigation
export const CircularArrowButton: React.FC<ButtonProps & { 
  direction?: 'left' | 'right' | 'up' | 'down';
  size?: 'small' | 'medium' | 'large';
}> = ({ 
  direction = 'right', 
  size = 'medium', 
  ...props 
}) => {
  const getIcon = () => {
    switch (direction) {
      case 'left': return <KeyboardArrowLeft />;
      case 'right': return <KeyboardArrowRight />;
      case 'up': return <KeyboardArrowUp />;
      case 'down': return <KeyboardArrowDown />;
      default: return <KeyboardArrowRight />;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small': return 40;
      case 'medium': return 56;
      case 'large': return 72;
      default: return 56;
    }
  };

  return (
    <StyledArrowButton
      variant="contained"
      sx={{
        borderRadius: '50%',
        width: getSize(),
        height: getSize(),
        padding: 0,
        minWidth: 'auto',
        '&:hover': {
          transform: 'scale(1.05) translateY(-2px)',
        },
      }}
      {...props}
    >
      {getIcon()}
    </StyledArrowButton>
  );
};

// Export all arrow button variants
export default {
  RightArrowButton,
  LeftArrowButton,
  UpArrowButton,
  DownArrowButton,
  ForwardArrowButton,
  BackArrowButton,
  CircularArrowButton,
};
