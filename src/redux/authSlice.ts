import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, AuthCredentials, AuthValidationErrors } from '../types';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Storage helpers for cross-platform compatibility
const setStorageItem = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getStorageItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const deleteStorageItem = async (key: string) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }
      
      if (credentials.email !== 'student@uom.ac.lk' || credentials.password !== 'password123') {
        throw new Error('Invalid email or password');
      }      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        isAuthenticated: true,
      };

      // Store user data securely
      await setStorageItem('userToken', 'mock_jwt_token');
      await setStorageItem('userData', JSON.stringify(user));

      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: AuthCredentials & { name: string }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!credentials.email || !credentials.password || !credentials.name) {
        throw new Error('All fields are required');
      }      const user: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        isAuthenticated: true,
      };

      // Store user data securely
      await setStorageItem('userToken', 'mock_jwt_token');
      await setStorageItem('userData', JSON.stringify(user));

      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadStoredUser = createAsyncThunk(
  'auth/loadStoredUser',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Loading stored user...');
      const token = await getStorageItem('userToken');
      const userData = await getStorageItem('userData');

      console.log('Token:', token);
      console.log('UserData:', userData);

      if (!token || !userData) {
        console.log('No stored user data found');
        throw new Error('No stored user data');
      }

      const user = JSON.parse(userData) as User;
      console.log('Parsed user:', user);
      return user;
    } catch (error: any) {
      console.error('Error loading stored user:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await deleteStorageItem('userToken');
      await deleteStorageItem('userData');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Load stored user
      .addCase(loadStoredUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadStoredUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
