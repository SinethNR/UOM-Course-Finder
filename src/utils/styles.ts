import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Screen dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Responsive functions
export const wp = (percentage: number) => {
  // For web, limit the width to make it more readable
  const maxWidth = 600; // Maximum form width on web
  const calculatedWidth = (percentage * width) / 100;
  
  if (width > 768 && calculatedWidth > maxWidth) {
    return (percentage * maxWidth) / 100;
  }
  
  return calculatedWidth;
};

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};

// Font scaling
export const normalizeFont = (size: number) => {
  // Better scaling for web
  if (width > 768) {
    return size; // Don't scale fonts on larger screens
  }
  
  const scale = width / 320;
  const newSize = size * scale;
  
  if (newSize < size) {
    return size;
  }
  
  return Math.round(newSize);
};

// Common styling constants
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// Layout constants for responsive design
export const LAYOUT = {
  maxFormWidth: 400,
  maxContentWidth: 1200,
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  },
};

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Grays
  black: '#000000',
  darkGray: '#1C1C1E',
  gray: '#8E8E93',
  lightGray: '#C7C7CC',
  extraLightGray: '#F2F2F7',
  white: '#FFFFFF',
  
  // Background
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
  
  // Text
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  textLight: '#FFFFFF',
  
  // UOM Brand Colors
  uomPrimary: '#003B5C',
  uomSecondary: '#FF6B35',
  uomAccent: '#4ECDC4',
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    // Web compatibility
    boxShadow: '0 1px 3px rgba(0,0,0,0.22)',
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Web compatibility
    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    // Web compatibility
    boxShadow: '0 4px 12px rgba(0,0,0,0.30)',
  },
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: normalizeFont(12),
    sm: normalizeFont(14),
    md: normalizeFont(16),
    lg: normalizeFont(18),
    xl: normalizeFont(20),
    xxl: normalizeFont(24),
    xxxl: normalizeFont(28),
  },
};
