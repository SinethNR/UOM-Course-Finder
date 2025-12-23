import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useAppSelector } from '../../hooks/redux';
import { useFavorites } from '../../hooks';
import CourseCard from '../../components/CourseCard';
import { COLORS, SPACING, FONTS } from '../../utils/styles';

const FavoritesScreen: React.FC = () => {
  const { courses } = useAppSelector(state => state.courses);
  const { favorites, isFavorite, toggleCourseFavorite } = useFavorites();

  const favoriteCourses = courses.filter(course => favorites.includes(course.id));

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyStateText}>
        Courses you mark as favorites will appear here
      </Text>
    </View>
  );

  const renderCourseCard = ({ item }: { item: any }) => (
    <CourseCard
      course={item}
      onPress={() => {}} // Navigation would be handled here
      isFavorite={true}
      onToggleFavorite={() => toggleCourseFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteCourses.length} course{favoriteCourses.length !== 1 ? 's' : ''} saved
        </Text>
      </View>
      
      <FlatList
        data={favoriteCourses}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.uomPrimary,
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white + 'DD',
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xxxl,
  },
  emptyStateTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
