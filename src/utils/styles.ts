import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Screen dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Responsive functions
export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};

// Font scaling
export const normalizeFont = (size: number) => {
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
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
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
