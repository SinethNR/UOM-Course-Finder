// User types
export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  department: string;
  credits: number;
  semester: string;
  year: number;
  enrollmentCount: number;
  maxCapacity: number;
  tags: string[];
  imageUrl?: string;
  schedule: CourseSchedule[];
}

export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  CourseList: undefined;
  CourseDetail: { courseId: string };
};

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface CoursesResponse {
  courses: Course[];
  totalCount: number;
  hasMore: boolean;
}

// Redux state types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface CoursesState {
  courses: Course[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: CourseFilters;
}

export interface CourseFilters {
  department?: string;
  semester?: string;
  year?: number;
  credits?: number;
}

export interface RootState {
  auth: AuthState;
  courses: CoursesState;
}

// Component Props types
export interface CourseCardProps {
  course: Course;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
