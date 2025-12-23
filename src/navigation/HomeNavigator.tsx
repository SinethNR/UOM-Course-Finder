import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import CourseListScreen from '../screens/main/CourseListScreen';
import CourseDetailScreen from '../screens/main/CourseDetailScreen';
import { COLORS } from '../utils/styles';

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
      }}
    >
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
        options={{
          title: 'Course Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
