# UOM Course Finder

A React Native mobile application for University of Moratuwa students to find and manage course information.

## Features

### 🔐 **User Authentication**
- Login with UOM email credentials
- User registration with validation
- Secure token storage using Expo SecureStore
- Demo credentials available for testing

### 🏠 **Home Screen with Course Listings**
- Browse all available courses
- Real-time search functionality
- Course filtering and sorting options
- Pull-to-refresh capability
- Beautiful card-based design

### 📚 **Course Details**
- Comprehensive course information
- Instructor details and department
- Class schedules with time and location
- Enrollment status and capacity tracking
- Course tags and categories
- Interactive favorite toggle

### ❤️ **Favorites System**
- Mark courses as favorites
- Persistent favorites storage
- Dedicated favorites screen
- Quick access to saved courses

### 👤 **User Profile**
- View user information
- Manage favorites
- App settings
- Logout functionality

### 🏗️ **Technical Architecture**
- **State Management**: Redux Toolkit with async thunks
- **Navigation**: React Navigation (Stack + Tab navigation)
- **Styling**: Custom design system with responsive utilities
- **Icons**: Feather Icons for consistent UI
- **Type Safety**: Full TypeScript implementation
- **Data Persistence**: Expo SecureStore for sensitive data

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx       # Custom button component
│   ├── Input.tsx        # Form input component
│   ├── CourseCard.tsx   # Course display card
│   └── LoadingSpinner.tsx
├── hooks/               # Custom React hooks
│   ├── redux.ts         # Typed Redux hooks
│   └── index.ts         # App-specific hooks
├── navigation/          # Navigation configuration
│   ├── RootNavigator.tsx    # Main navigation wrapper
│   ├── AuthNavigator.tsx    # Auth flow navigation
│   ├── MainNavigator.tsx    # Main app tab navigation
│   └── HomeNavigator.tsx    # Home stack navigation
├── redux/               # State management
│   ├── store.ts         # Redux store configuration
│   ├── authSlice.ts     # Authentication state
│   └── coursesSlice.ts  # Courses and favorites state
├── screens/             # App screens
│   ├── auth/            # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── main/            # Main app screens
│       ├── CourseListScreen.tsx
│       ├── CourseDetailScreen.tsx
│       ├── FavoritesScreen.tsx
│       └── ProfileScreen.tsx
├── services/            # API services (future)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── styles.ts        # Design system and styling
│   └── helpers.ts       # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v20.16.0 or higher recommended)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone and setup**
   ```bash
   cd "UOM course finder/A"
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device/emulator**
   - Scan the QR code with Expo Go app (Android)
   - Scan the QR code with Camera app (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

### Demo Credentials

For testing purposes, use these credentials:

**Email:** `student@uom.ac.lk`  
**Password:** `password123`

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start and open Android app
- `npm run ios` - Start and open iOS app  
- `npm run web` - Start and open web app
- `npm run build:android` - Build Android APK
- `npm run build:ios` - Build iOS app

## Design System

### Colors
- **Primary**: UOM Blue (#003B5C)
- **Secondary**: UOM Orange (#FF6B35)
- **Accent**: UOM Teal (#4ECDC4)
- **Success**: Green (#34C759)
- **Warning**: Orange (#FF9500)
- **Error**: Red (#FF3B30)

### Typography
- Small (12px), Medium (16px), Large (18px), Extra Large (24px)
- Responsive font scaling based on screen size
- System fonts for platform consistency

### Components
- Consistent spacing (4px grid system)
- Rounded corners (4px, 8px, 12px, 16px)
- Drop shadows for elevation
- Responsive design utilities

## State Management

### Authentication State
```typescript
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
```

### Courses State
```typescript
interface CoursesState {
  courses: Course[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: CourseFilters;
}
```

## API Integration

The app is currently configured with mock data for demonstration. Future versions will integrate with:

- UOM Course Management System API
- Student Information System
- Real-time enrollment data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Dependencies

### Core
- **React Native**: Mobile app framework
- **Expo**: Development platform and tools
- **TypeScript**: Type safety and developer experience

### Navigation
- **@react-navigation/native**: Navigation framework
- **@react-navigation/stack**: Stack navigator
- **@react-navigation/bottom-tabs**: Tab navigator

### State Management
- **@reduxjs/toolkit**: Modern Redux with utilities
- **react-redux**: React-Redux bindings

### UI & Styling
- **react-native-feather**: Icon library
- **expo-secure-store**: Secure storage
- **@expo/vector-icons**: Additional icons

## License

This project is created for educational purposes as part of the University of Moratuwa course management system.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**University of Moratuwa - Software Engineering Project**  
*Making course management accessible and intuitive for students.*
