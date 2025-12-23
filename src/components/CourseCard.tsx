import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Heart, Users, Clock, MapPin } from 'react-native-feather';
import { Course } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, FONTS, SHADOWS } from '../utils/styles';
import { formatSchedule, getEnrollmentStatus, truncateText } from '../utils/helpers';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onPress,
  isFavorite,
  onToggleFavorite,
}) => {
  const enrollmentStatus = getEnrollmentStatus(course);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{truncateText(course.title, 25)}</Text>
          <Text style={styles.instructor}>by {course.instructor}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          activeOpacity={0.7}
        >
          <Heart
            stroke={isFavorite ? COLORS.error : COLORS.gray}
            fill={isFavorite ? COLORS.error : 'transparent'}
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        {truncateText(course.description, 100)}
      </Text>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Users stroke={COLORS.gray} width={16} height={16} />
          <Text style={styles.infoText}>
            {course.enrollmentCount}/{course.maxCapacity}
          </Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: enrollmentStatus.color + '20' }]}>
          <Text style={[styles.statusText, { color: enrollmentStatus.color }]}>
            {enrollmentStatus.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Clock stroke={COLORS.gray} width={16} height={16} />
          <Text style={styles.infoText}>{formatSchedule(course)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tagContainer}>
          {course.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.credits}>{course.credits} Credits</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs / 2,
  },
  instructor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
  description: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  tagContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: COLORS.uomPrimary + '15',
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs / 2,
    marginBottom: SPACING.xs / 2,
  },
  tagText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.uomPrimary,
    fontWeight: '500',
  },
  credits: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.uomSecondary,
  },
});

export default CourseCard;
