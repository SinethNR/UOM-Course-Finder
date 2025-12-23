import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heart, Users, Clock, MapPin, Calendar, Star } from 'react-native-feather';
import { HomeStackParamList, Course } from '../../types';
import { useAppSelector } from '../../hooks/redux';
import { useFavorites } from '../../hooks';
import Button from '../../components/Button';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/styles';
import { formatTime, getEnrollmentStatus } from '../../utils/helpers';

type CourseDetailScreenProps = NativeStackScreenProps<HomeStackParamList, 'CourseDetail'>;

const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({ route }) => {
  const { course } = route.params;
  const { courses } = useAppSelector(state => state.courses);
  const { isFavorite, toggleCourseFavorite } = useFavorites();
  // Use the passed course or find it by ID as fallback
  const courseData = course;

  if (!courseData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Course not found</Text>
      </View>
    );
  }

  const enrollmentStatus = getEnrollmentStatus(course);
  const canEnroll = enrollmentStatus.status !== 'Full';
  const handleEnroll = () => {
    Alert.alert(
      'Enroll in Course',
      `Are you sure you want to enroll in ${courseData.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enroll', 
          onPress: () => Alert.alert('Success', 'You have been enrolled in the course!') 
        },
      ]
    );
  };

  const handleToggleFavorite = () => {
    toggleCourseFavorite(course.id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>          <Text style={styles.title}>{courseData.title}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            activeOpacity={0.7}
          >
            <Heart
              stroke={isFavorite(courseData.id) ? COLORS.error : COLORS.gray}
              fill={isFavorite(courseData.id) ? COLORS.error : 'transparent'}
              width={28}
              height={28}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.instructor}>Instructor: {courseData.instructor}</Text>
        <Text style={styles.department}>{courseData.department}</Text>
      </View>

      <View style={styles.quickInfo}>
        <View style={styles.infoCard}>          <Text style={styles.infoCardValue}>{courseData.credits}</Text>
          <Text style={styles.infoCardLabel}>Credits</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardValue}>{courseData.semester}</Text>
          <Text style={styles.infoCardLabel}>Semester</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardValue}>{courseData.year}</Text>
          <Text style={styles.infoCardLabel}>Year</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enrollment Status</Text>
        <View style={styles.enrollmentContainer}>
          <View style={styles.enrollmentInfo}>
            <Users stroke={COLORS.gray} width={20} height={20} />            <Text style={styles.enrollmentText}>
              {courseData.enrollmentCount} of {courseData.maxCapacity} students enrolled
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: enrollmentStatus.color + '20' }]}>
            <Text style={[styles.statusText, { color: enrollmentStatus.color }]}>
              {enrollmentStatus.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(course.enrollmentCount / course.maxCapacity) * 100}%`,
                  backgroundColor: enrollmentStatus.color 
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>        <Text style={styles.description}>{courseData.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        {courseData.schedule.map((schedule, index) => (
          <View key={index} style={styles.scheduleItem}>
            <View style={styles.scheduleHeader}>
              <Calendar stroke={COLORS.uomPrimary} width={20} height={20} />
              <Text style={styles.scheduleDay}>{schedule.day}</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <View style={styles.scheduleTime}>
                <Clock stroke={COLORS.gray} width={16} height={16} />
                <Text style={styles.scheduleText}>
                  {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                </Text>
              </View>
              <View style={styles.scheduleLocation}>
                <MapPin stroke={COLORS.gray} width={16} height={16} />
                <Text style={styles.scheduleText}>{schedule.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Tags</Text>        <View style={styles.tagsContainer}>
          {courseData.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Button
          title={canEnroll ? "Enroll Now" : "Course Full"}
          onPress={handleEnroll}
          disabled={!canEnroll}
          fullWidth
          variant={canEnroll ? "primary" : "outline"}
          style={styles.enrollButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.error,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
  instructor: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  department: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.uomPrimary,
    fontWeight: '600',
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  infoCard: {
    alignItems: 'center',
  },
  infoCardValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.uomPrimary,
    marginBottom: SPACING.xs / 2,
  },
  infoCardLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  enrollmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  enrollmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  enrollmentText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: SPACING.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    lineHeight: 24,
  },
  scheduleItem: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  scheduleDay: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  scheduleDetails: {
    marginLeft: SPACING.lg + SPACING.sm,
  },
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  scheduleLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: COLORS.uomPrimary + '15',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  tagText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.uomPrimary,
    fontWeight: '600',
  },
  actionContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  enrollButton: {
    height: 52,
  },
});

export default CourseDetailScreen;
