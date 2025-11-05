import { createTheme, ThemeOptions } from '@mui/material/styles';

// Custom color palette for UCID Industrial Design App
const colors = {
  // Primary brand colors - Industrial/Technical feel
  primary: {
    main: '#E00122', // Beautiful red (RGB: 224, 1, 34)
    light: '#FF1A3D', // Lighter red
    dark: '#B3001B', // Darker red
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF6B35', // Vibrant orange for CTAs
    light: '#FF8A65', // Lighter orange
    dark: '#E64A19', // Darker orange
    contrastText: '#FFFFFF',
  },
  // Neutral colors for industrial design aesthetic
  neutral: {
    main: '#37474F', // Dark blue-grey
    light: '#546E7A', // Lighter blue-grey
    dark: '#263238', // Darker blue-grey
    contrastText: '#FFFFFF',
  },
  // Background colors
  background: {
    default: '#FAFAFA', // Light grey background
    paper: '#FFFFFF', // White paper
    dark: '#F5F5F5', // Slightly darker grey
  },
  // Text colors
  text: {
    primary: '#212121', // Dark grey for primary text
    secondary: '#757575', // Medium grey for secondary text
    disabled: '#BDBDBD', // Light grey for disabled text
  },
  // Success/Error/Info colors
  success: {
    main: '#E00122', // Red for success (matching primary)
    light: '#FF1A3D',
    dark: '#B3001B',
  },
  error: {
    main: '#F44336', // Red for errors
    light: '#E57373',
    dark: '#D32F2F',
  },
  warning: {
    main: '#FF9800', // Orange for warnings
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#2196F3', // Blue for info
    light: '#64B5F6',
    dark: '#1976D2',
  },
};

// Custom typography system
const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: colors.text.primary,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: colors.text.primary,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.text.primary,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4,
    color: colors.text.primary,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.text.primary,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.text.primary,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
    color: colors.text.secondary,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.6,
    color: colors.text.secondary,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
    color: colors.text.primary,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
    color: colors.text.secondary,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: 'none' as const, // Remove all caps
    letterSpacing: '0.01em',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.text.secondary,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: colors.text.secondary,
  },
};

// Custom component styling
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '12px 24px',
        boxShadow: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      contained: {
        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
        '&:hover': {
          background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
          background: `${colors.primary.main}10`,
        },
      },
      text: {
        '&:hover': {
          background: `${colors.primary.main}10`,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          backgroundColor: colors.background.paper,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.light,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
            borderWidth: 2,
          },
        },
        '& .MuiInputLabel-root': {
          color: colors.text.secondary,
          '&.Mui-focused': {
            color: colors.primary.main,
          },
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        background: colors.background.paper,
        borderRight: `1px solid ${colors.background.dark}`,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: '4px 8px',
        '&:hover': {
          backgroundColor: `${colors.primary.main}10`,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        fontWeight: 500,
      },
    },
  },
};

// Create the theme
export const ucidTheme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: colors.text,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
  },
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Base spacing unit
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    '0 25px 50px rgba(0,0,0,0.25), 0 20px 15px rgba(0,0,0,0.20)',
    '0 30px 60px rgba(0,0,0,0.25), 0 25px 20px rgba(0,0,0,0.20)',
    '0 35px 70px rgba(0,0,0,0.25), 0 30px 25px rgba(0,0,0,0.20)',
    '0 40px 80px rgba(0,0,0,0.25), 0 35px 30px rgba(0,0,0,0.20)',
    '0 45px 90px rgba(0,0,0,0.25), 0 40px 35px rgba(0,0,0,0.20)',
    '0 50px 100px rgba(0,0,0,0.25), 0 45px 40px rgba(0,0,0,0.20)',
    '0 55px 110px rgba(0,0,0,0.25), 0 50px 45px rgba(0,0,0,0.20)',
    '0 60px 120px rgba(0,0,0,0.25), 0 55px 50px rgba(0,0,0,0.20)',
    '0 65px 130px rgba(0,0,0,0.25), 0 60px 55px rgba(0,0,0,0.20)',
    '0 70px 140px rgba(0,0,0,0.25), 0 65px 60px rgba(0,0,0,0.20)',
    '0 75px 150px rgba(0,0,0,0.25), 0 70px 65px rgba(0,0,0,0.20)',
    '0 80px 160px rgba(0,0,0,0.25), 0 75px 70px rgba(0,0,0,0.20)',
    '0 85px 170px rgba(0,0,0,0.25), 0 80px 75px rgba(0,0,0,0.20)',
    '0 90px 180px rgba(0,0,0,0.25), 0 85px 80px rgba(0,0,0,0.20)',
    '0 95px 190px rgba(0,0,0,0.25), 0 90px 85px rgba(0,0,0,0.20)',
    '0 100px 200px rgba(0,0,0,0.25), 0 95px 90px rgba(0,0,0,0.20)',
    '0 105px 210px rgba(0,0,0,0.25), 0 100px 95px rgba(0,0,0,0.20)',
    '0 110px 220px rgba(0,0,0,0.25), 0 105px 100px rgba(0,0,0,0.20)',
    '0 115px 230px rgba(0,0,0,0.25), 0 110px 105px rgba(0,0,0,0.20)',
    '0 120px 240px rgba(0,0,0,0.25), 0 115px 110px rgba(0,0,0,0.20)',
  ] as any,
});

export default ucidTheme;
