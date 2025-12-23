import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeStackParamList } from '../types';
import CourseListScreen from '../screens/main/CourseListScreen';
import CourseDetailScreen from '../screens/main/CourseDetailScreen';
import { useAppSelector } from '../hooks/redux';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../utils/styles';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const CustomHeader: React.FC<{ title: string }> = ({ title }) => {
  const { user } = useAppSelector(state => state.auth);
  
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>UOM</Text>
        </View>
        <View>
          <Text style={styles.appTitle}>{title}</Text>
          <Text style={styles.subtitle}>Campus & Education</Text>
        </View>
      </View>
      
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profilePicture}>
            <Text style={styles.profileInitial}>
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'S'}
            </Text>
          </View>
          <Text style={styles.studentId}>Student 224135V</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WelcomeHeader: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Welcome back, Student!</Text>
      <Text style={styles.welcomeSubtitle}>Explore courses and campus events tailored for you</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CourseList"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.uomPrimary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}    >
      <Stack.Screen 
        name="CourseList" 
        component={CourseListScreen}
        options={{
          title: 'UOM Course Finder',
        }}
      />
      <Stack.Screen 
        name="CourseDetail" 
        component={CourseDetailScreen}
        options={({ route }) => ({
          title: 'Course Details',
          headerTitleStyle: {
            fontSize: 16,
          },
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.uomPrimary,
    paddingHorizontal: SPACING.md,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  logoText: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.uomPrimary,
  },
  appTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  profileButton: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.uomSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileInitial: {
    fontSize: FONTS.sizes.sm,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  studentId: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white,
    opacity: 0.9,
  },
  welcomeContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  welcomeTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.uomPrimary,
    fontWeight: '600',
  },
});

export default HomeNavigator;
