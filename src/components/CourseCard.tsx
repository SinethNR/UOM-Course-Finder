import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Heart, Users, Star, Clock } from 'react-native-feather';
import { Course } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, FONTS, SHADOWS } from '../utils/styles';
import { formatSchedule, getEnrollmentStatus, truncateText } from '../utils/helpers';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2; // 2 columns with spacing

interface CourseCardProps {
  course: Course;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// Course image placeholder colors
const getCourseImageStyle = (courseId: string) => {
  const colorMap: { [key: string]: string } = {
    '1': '#FF6B6B', // Red for Mobile Development
    '2': '#4ECDC4', // Teal for Web Development  
    '3': '#45B7D1', // Blue for Data Structures
    '4': '#96CEB4', // Green for AI/Neural Networks
    '5': '#FFEAA7', // Yellow for UI Design
  };
  
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];
  
  return {
    backgroundColor: colorMap[courseId] || '#6c5ce7',
  };
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onPress,
  isFavorite,
  onToggleFavorite,
}) => {
  const enrollmentStatus = getEnrollmentStatus(course);
  const rating = 4.0 + Math.random() * 1; // Mock rating between 4.0-5.0
  const weeks = Math.floor(Math.random() * 8) + 8; // 8-16 weeks
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Course Image */}
      <View style={styles.imageContainer}>
        <View 
          style={[styles.courseImagePlaceholder, getCourseImageStyle(course.id)]}
        >
          <Text style={styles.courseImageText}>{course.title.split(' ').map(word => word[0]).join('').substring(0, 3).toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          activeOpacity={0.7}
        >
          <Heart
            stroke={isFavorite ? COLORS.error : COLORS.white}
            fill={isFavorite ? COLORS.error : 'transparent'}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: enrollmentStatus.color }]}>
          <Text style={styles.statusText}>{enrollmentStatus.status}</Text>
        </View>
      </View>

      {/* Course Info */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{truncateText(course.title, 35)}</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
        
        <Text style={styles.description}>
          {truncateText(course.description, 80)}
        </Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Users stroke={COLORS.gray} width={14} height={14} />
            <Text style={styles.statText}>{course.enrollmentCount}/{course.maxCapacity}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Star stroke={COLORS.warning} fill={COLORS.warning} width={14} height={14} />
            <Text style={styles.statText}>{rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Duration */}
        <View style={styles.durationContainer}>
          <Clock stroke={COLORS.gray} width={14} height={14} />
          <Text style={styles.durationText}>{weeks} weeks</Text>
        </View>

        {/* View Details Button */}
        <TouchableOpacity style={styles.viewDetailsButton} onPress={onPress}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({  container: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  courseImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImageText: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    color: COLORS.white,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  instructor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: SPACING.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  statText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginLeft: 4,
    fontWeight: '500',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  durationText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginLeft: 4,
  },
  viewDetailsButton: {
    backgroundColor: COLORS.uomPrimary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default CourseCard;
