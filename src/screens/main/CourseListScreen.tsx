import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Search, Filter } from 'react-native-feather';
import { HomeStackParamList, Course } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFavorites } from '../../hooks';
import { fetchCourses, setSearchQuery } from '../../redux/coursesSlice';
import CourseCard from '../../components/CourseCard';
import { COLORS, SPACING, FONTS } from '../../utils/styles';
import { filterCoursesByQuery, debounce } from '../../utils/helpers';

type CourseListScreenProps = NativeStackScreenProps<HomeStackParamList, 'CourseList'>;

const CourseListScreen: React.FC<CourseListScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { courses, isLoading, searchQuery } = useAppSelector(state => state.courses);
  const { isFavorite, toggleCourseFavorite } = useFavorites();
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  // Filtered courses based on search query
  const filteredCourses = useMemo(() => {
    return filterCoursesByQuery(courses, searchQuery);
  }, [courses, searchQuery]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(localSearchQuery);
  }, [localSearchQuery, debouncedSearch]);

  const handleRefresh = () => {
    dispatch(fetchCourses());
  };

  const handleCoursePress = (course: Course) => {
    navigation.navigate('CourseDetail', { courseId: course.id });
  };

  const renderCourseCard = ({ item }: { item: Course }) => (
    <CourseCard
      course={item}
      onPress={() => handleCoursePress(item)}
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={() => toggleCourseFavorite(item.id)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search stroke={COLORS.gray} width={20} height={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={localSearchQuery}
            onChangeText={setLocalSearchQuery}
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Filter stroke={COLORS.uomPrimary} width={20} height={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No courses found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery ? 'Try adjusting your search terms' : 'Pull down to refresh'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[COLORS.uomPrimary]}
            tintColor={COLORS.uomPrimary}
          />
        }
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
  listContent: {
    paddingBottom: SPACING.lg,
  },
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  filterButton: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
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

export default CourseListScreen;
