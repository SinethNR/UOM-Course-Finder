import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronDown, ChevronUp, FileText, Link, Check, Calendar, MessageSquare } from 'react-native-feather';
import { HomeStackParamList, Course } from '../../types';
import { useAppSelector } from '../../hooks/redux';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../../utils/styles';

type CourseDetailScreenProps = NativeStackScreenProps<HomeStackParamList, 'CourseDetail'>;

interface CourseSection {
  id: string;
  title: string;
  isExpanded: boolean;
  items: CourseSectionItem[];
}

interface CourseSectionItem {
  id: string;
  type: 'document' | 'link' | 'announcement' | 'lecture';
  title: string;
  size?: string;
  isDone?: boolean;
  description?: string;
}

const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({ route, navigation }) => {
  const { courseId } = route.params;
  const { courses } = useAppSelector(state => state.courses);

  // Find the course by ID
  const course = courses.find(c => c.id === courseId);

  // Mock course sections data
  const [sections, setSections] = useState<CourseSection[]>([
    {
      id: 'general',
      title: 'General',
      isExpanded: true,
      items: [
        {
          id: 'final-grades',
          type: 'document',
          title: 'Final Grades',
          size: '171.8 KB',
        },
        {
          id: 'announcements',
          type: 'announcement',
          title: 'Announcements',
        },
        {
          id: 'zoom-link',
          type: 'link',
          title: 'Lecture Zoom Link',
        },
        {
          id: 'eligibility-list',
          type: 'document',
          title: 'Eligibility List for the final Exam',
          size: '216.7 KB',
        },
      ],
    },
    {
      id: 'week-1',
      title: '31 July - 6 August',
      isExpanded: true,
      items: [
        {
          id: 'lecture-1',
          type: 'lecture',
          title: 'Lecture 1: Introduction and Multimedia Data Representations',
          size: '295.4 KB',
          isDone: true,
        },
      ],
    },
    {
      id: 'week-2',
      title: '7 August - 13 August',
      isExpanded: false,
      items: [
        {
          id: 'lecture-2',
          type: 'lecture',
          title: 'Lecture 2: Audio and Video Fundamentals',
          size: '324.1 KB',
        },
        {
          id: 'assignment-1',
          type: 'document',
          title: 'Assignment 1: Multimedia Formats',
          size: '128.3 KB',
        },
      ],
    },
    {
      id: 'week-3',
      title: '14 August - 20 August',
      isExpanded: false,
      items: [
        {
          id: 'lecture-3',
          type: 'lecture',
          title: 'Lecture 3: Compression Techniques',
          size: '412.7 KB',
        },
      ],
    },
  ]);

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Course not found</Text>
      </View>
    );
  }

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const renderSectionItem = (item: CourseSectionItem) => {
    const getItemIcon = () => {
      switch (item.type) {
        case 'document':
          return <FileText stroke={COLORS.uomPrimary} width={20} height={20} />;
        case 'link':
          return <Link stroke={COLORS.uomSecondary} width={20} height={20} />;
        case 'announcement':
          return <MessageSquare stroke={COLORS.warning} width={20} height={20} />;
        case 'lecture':
          return <FileText stroke={COLORS.success} width={20} height={20} />;
        default:
          return <FileText stroke={COLORS.gray} width={20} height={20} />;
      }
    };

    return (
      <TouchableOpacity key={item.id} style={styles.sectionItem}>
        <View style={styles.itemLeft}>
          {getItemIcon()}
          <View style={styles.itemContent}>
            <Text style={[
              styles.itemTitle,
              item.type === 'link' && styles.linkText
            ]}>
              {item.title}
            </Text>
            {item.size && (
              <Text style={styles.itemSize}>{item.size}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.itemRight}>
          {item.isDone ? (
            <View style={styles.doneIndicator}>
              <Check stroke={COLORS.white} width={16} height={16} />
            </View>
          ) : (
            <TouchableOpacity style={styles.markDoneButton}>
              <Text style={styles.markDoneText}>Mark as done</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Course Header */}
      <View style={styles.courseHeader}>
        <Text style={styles.courseCode}>
          {course.id.toUpperCase()}-S1-IN{course.semester}11 - {course.title}
        </Text>
      </View>

      {/* Course Navigation Tabs */}
      <View style={styles.navigationTabs}>
        <TouchableOpacity style={[styles.navTab, styles.activeNavTab]}>
          <Text style={[styles.navTabText, styles.activeNavTabText]}>Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Text style={styles.navTabText}>Participants</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Text style={styles.navTabText}>Grades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Text style={styles.navTabText}>Competencies</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Collapse All Link */}
        <View style={styles.collapseAllContainer}>
          <TouchableOpacity>
            <Text style={styles.collapseAllText}>Collapse all</Text>
          </TouchableOpacity>
        </View>

        {/* Course Sections */}
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
            >
              <View style={styles.sectionHeaderLeft}>
                {section.isExpanded ? (
                  <ChevronDown stroke={COLORS.gray} width={24} height={24} />
                ) : (
                  <ChevronUp stroke={COLORS.gray} width={24} height={24} />
                )}
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
            </TouchableOpacity>

            {section.isExpanded && (
              <View style={styles.sectionContent}>
                {section.items.map(item => renderSectionItem(item))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
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
  courseHeader: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  courseCode: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  navigationTabs: {
    backgroundColor: COLORS.uomPrimary,
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
  },
  navTab: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginRight: SPACING.sm,
  },
  activeNavTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.white,
  },
  navTabText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    opacity: 0.8,
  },
  activeNavTabText: {
    opacity: 1,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  collapseAllContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  collapseAllText: {
    color: COLORS.uomPrimary,
    fontSize: FONTS.sizes.sm,
    textDecorationLine: 'underline',
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: COLORS.extraLightGray,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  sectionContent: {
    padding: SPACING.md,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  itemTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginBottom: 2,
  },
  linkText: {
    color: COLORS.uomPrimary,
    textDecorationLine: 'underline',
  },
  itemSize: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  doneIndicator: {
    backgroundColor: COLORS.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markDoneButton: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  markDoneText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text,
  },
});

export default CourseDetailScreen;
