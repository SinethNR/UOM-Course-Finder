import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CoursesState, Course, CourseFilters } from '../types';
import * as SecureStore from 'expo-secure-store';

// Mock course data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Software Engineering',
    description: 'Comprehensive course covering software development lifecycle, design patterns, and project management.',
    instructor: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    credits: 4,
    semester: 'Fall',
    year: 2024,
    enrollmentCount: 45,
    maxCapacity: 50,
    tags: ['Programming', 'Design', 'Management'],
    imageUrl: 'https://via.placeholder.com/300x200',
    schedule: [
      { day: 'Monday', startTime: '10:00', endTime: '11:30', location: 'CS-101' },
      { day: 'Wednesday', startTime: '10:00', endTime: '11:30', location: 'CS-101' }
    ]
  },
  {
    id: '2',
    title: 'Database Systems',
    description: 'Study of database design, SQL, NoSQL databases, and data management principles.',
    instructor: 'Prof. Michael Chen',
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall',
    year: 2024,
    enrollmentCount: 38,
    maxCapacity: 40,
    tags: ['Database', 'SQL', 'Data Management'],
    imageUrl: 'https://via.placeholder.com/300x200',
    schedule: [
      { day: 'Tuesday', startTime: '14:00', endTime: '15:30', location: 'CS-102' },
      { day: 'Thursday', startTime: '14:00', endTime: '15:30', location: 'CS-102' }
    ]
  },
  {
    id: '3',
    title: 'Machine Learning',
    description: 'Introduction to machine learning algorithms, neural networks, and AI applications.',
    instructor: 'Dr. Emily Rodriguez',
    department: 'Computer Science',
    credits: 4,
    semester: 'Spring',
    year: 2024,
    enrollmentCount: 32,
    maxCapacity: 35,
    tags: ['AI', 'Machine Learning', 'Python'],
    imageUrl: 'https://via.placeholder.com/300x200',
    schedule: [
      { day: 'Monday', startTime: '13:00', endTime: '14:30', location: 'CS-103' },
      { day: 'Friday', startTime: '13:00', endTime: '14:30', location: 'CS-103' }
    ]
  },
  {
    id: '4',
    title: 'Web Development',
    description: 'Full-stack web development using modern frameworks and technologies.',
    instructor: 'Mr. David Wilson',
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall',
    year: 2024,
    enrollmentCount: 42,
    maxCapacity: 45,
    tags: ['Web', 'JavaScript', 'React'],
    imageUrl: 'https://via.placeholder.com/300x200',
    schedule: [
      { day: 'Tuesday', startTime: '11:00', endTime: '12:30', location: 'CS-104' },
      { day: 'Thursday', startTime: '11:00', endTime: '12:30', location: 'CS-104' }
    ]
  },
  {
    id: '5',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile application development for iOS and Android.',
    instructor: 'Ms. Lisa Brown',
    department: 'Computer Science',
    credits: 4,
    semester: 'Spring',
    year: 2024,
    enrollmentCount: 28,
    maxCapacity: 30,
    tags: ['Mobile', 'React Native', 'iOS', 'Android'],
    imageUrl: 'https://via.placeholder.com/300x200',
    schedule: [
      { day: 'Wednesday', startTime: '15:00', endTime: '16:30', location: 'CS-105' },
      { day: 'Friday', startTime: '15:00', endTime: '16:30', location: 'CS-105' }
    ]
  }
];

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (filters?: CourseFilters, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredCourses = [...mockCourses];
      
      if (filters) {
        if (filters.department) {
          filteredCourses = filteredCourses.filter(
            course => course.department.toLowerCase().includes(filters.department!.toLowerCase())
          );
        }
        if (filters.semester) {
          filteredCourses = filteredCourses.filter(
            course => course.semester.toLowerCase() === filters.semester!.toLowerCase()
          );
        }
        if (filters.year) {
          filteredCourses = filteredCourses.filter(
            course => course.year === filters.year
          );
        }
        if (filters.credits) {
          filteredCourses = filteredCourses.filter(
            course => course.credits === filters.credits
          );
        }
      }
      
      return filteredCourses;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async (query: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredCourses = mockCourses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      return filteredCourses;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadFavorites = createAsyncThunk(
  'courses/loadFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const favoritesData = await SecureStore.getItemAsync('favorites');
      return favoritesData ? JSON.parse(favoritesData) : [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveFavorites = createAsyncThunk(
  'courses/saveFavorites',
  async (favorites: string[], { rejectWithValue }) => {
    try {
      await SecureStore.setItemAsync('favorites', JSON.stringify(favorites));
      return favorites;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: CoursesState = {
  courses: [],
  favorites: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: {},
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<CourseFilters>) => {
      state.filters = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      const index = state.favorites.indexOf(courseId);
      
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(courseId);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Search courses
      .addCase(searchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Load favorites
      .addCase(loadFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.favorites = action.payload;
      })
      
      // Save favorites
      .addCase(saveFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.favorites = action.payload;
      });
  },
});

export const { 
  clearError, 
  setSearchQuery, 
  setFilters, 
  toggleFavorite, 
  clearFavorites 
} = coursesSlice.actions;

export default coursesSlice.reducer;
