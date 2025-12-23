import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../types';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../../utils/styles';
import {
  BookOpen,
  Clock,
  Users,
  Download,
  Play,
  FileText,
  ChevronDown,
  ChevronRight,
  Calendar,
  Award,
  User,
  Link,
  CheckCircle,
  Circle,
} from 'react-native-feather';

type CourseDetailRouteProp = RouteProp<HomeStackParamList, 'CourseDetail'>;

interface Section {
  id: string;
  title: string;
  items: SectionItem[];
  isExpanded?: boolean;
}

interface SectionItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'assignment' | 'link' | 'announcement';
  duration?: string;
  dueDate?: string;
  size?: string;
  isCompleted?: boolean;
  description?: string;
}

const CourseDetailScreen: React.FC = () => {
  const route = useRoute<CourseDetailRouteProp>();
  const { course } = route.params || {};
  
  // Fallback course data if undefined
  const fallbackCourse = {
    id: '1',
    title: 'Multimedia Technologies',
    code: 'B22-S1-IN1611',
    description: 'Introduction to multimedia technologies and applications',
    instructor: 'Dr. John Smith',
    department: 'Computer Science',
    credits: 3,
    semester: 'Spring',
    year: 2024,
    enrollmentCount: 45,
    maxCapacity: 50,
    tags: ['Technology', 'Multimedia'],
    schedule: []
  };
  
  const courseData = course || fallbackCourse;
  
  const [expandedSections, setExpandedSections] = useState<string[]>(['general', 'week1']);

  const courseSections: Section[] = [
    {
      id: 'general',
      title: 'General',
      isExpanded: true,
      items: [
        {
          id: 'final-grades',
          title: 'Final Grades',
          type: 'document',
          size: '171.8 KB',
          description: 'Final examination grades and course completion status',
        },
        {
          id: 'announcements',
          title: 'Announcements',
          type: 'announcement',
          description: 'Course announcements and important updates',
        },
        {
          id: 'lecture-zoom',
          title: 'Lecture Zoom Link',
          type: 'link',
          description: 'Join live lectures via Zoom',
        },
        {
          id: 'eligibility-list',
          title: 'Eligibility List for the final Exam',
          type: 'document',
          size: '216.7 KB',
          description: 'Students eligible for final examination',
        },
      ],
    },
    {
      id: 'week1',
      title: '31 July - 6 August',
      isExpanded: true,
      items: [
        {
          id: 'lecture1',
          title: 'Lecture 1: Introduction and Multimedia Data Representations',
          type: 'video',
          duration: '45 min',
          size: '295.4 KB',
          isCompleted: true,
          description: 'Overview of multimedia systems and data representation formats',
        },
      ],
    },
    {
      id: 'week2',
      title: '7 August - 13 August',
      items: [
        {
          id: 'lecture2',
          title: 'Lecture 2: Image Processing Fundamentals',
          type: 'video',
          duration: '50 min',
          size: '412.3 KB',
          isCompleted: false,
          description: 'Basic concepts of digital image processing',
        },
        {
          id: 'assignment1',
          title: 'Assignment 1: Image Analysis',
          type: 'assignment',
          dueDate: 'Due: Aug 20, 2024',
          description: 'Analyze and process digital images using given tools',
        },
      ],
    },
    {
      id: 'week3',
      title: '14 August - 20 August',
      items: [
        {
          id: 'lecture3',
          title: 'Lecture 3: Audio and Video Compression',
          type: 'video',
          duration: '55 min',
          size: '523.7 KB',
          description: 'Compression techniques for multimedia content',
        },
        {
          id: 'quiz1',
          title: 'Quiz 1: Multimedia Basics',
          type: 'quiz',
          dueDate: 'Due: Aug 25, 2024',
          description: 'Assessment of basic multimedia concepts',
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play stroke={COLORS.uomPrimary} fill={COLORS.uomPrimary} width={18} height={18} />;
      case 'document':
        return <FileText stroke={COLORS.primary} width={18} height={18} />;
      case 'quiz':
        return <Award stroke={COLORS.warning} width={18} height={18} />;
      case 'assignment':
        return <BookOpen stroke={COLORS.error} width={18} height={18} />;
      case 'link':
        return <Link stroke={COLORS.uomAccent} width={18} height={18} />;
      case 'announcement':
        return <FileText stroke={COLORS.uomSecondary} width={18} height={18} />;
      default:
        return <FileText stroke={COLORS.gray} width={18} height={18} />;
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return COLORS.uomPrimary;
      case 'document':
        return COLORS.primary;
      case 'quiz':
        return COLORS.warning;
      case 'assignment':
        return COLORS.error;
      case 'link':
        return COLORS.uomAccent;
      case 'announcement':
        return COLORS.uomSecondary;
      default:
        return COLORS.gray;
    }
  };

  return (
    <View style={styles.container}>
      {/* Course Header - Moodle Style */}
      <View style={styles.courseHeader}>
        <Text style={styles.courseCode}>{courseData.code || 'B22-S1-IN1611'}</Text>
        <Text style={styles.courseTitle}>{courseData.title}</Text>
        
        {/* Course Navigation Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Course</Text>
          <Text style={styles.breadcrumbSeparator}>•</Text>
          <Text style={styles.breadcrumbText}>Participants</Text>
          <Text style={styles.breadcrumbSeparator}>•</Text>
          <Text style={styles.breadcrumbText}>Grades</Text>
          <Text style={styles.breadcrumbSeparator}>•</Text>
          <Text style={styles.breadcrumbText}>Competencies</Text>
        </View>
      </View>

      {/* Course Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {courseSections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <View key={section.id} style={styles.sectionContainer}>
                {/* Section Header */}
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.sectionTitleContainer}>
                    {isExpanded ? (
                      <ChevronDown stroke={COLORS.uomPrimary} width={20} height={20} />
                    ) : (
                      <ChevronRight stroke={COLORS.gray} width={20} height={20} />
                    )}
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <TouchableOpacity style={styles.collapseAllButton}>
                    <Text style={styles.collapseAllText}>Collapse all</Text>
                  </TouchableOpacity>
                </TouchableOpacity>

                {/* Section Content */}
                {isExpanded && (
                  <View style={styles.sectionContent}>
                    {section.items.map((item) => (
                      <TouchableOpacity key={item.id} style={styles.sectionItem}>
                        <View style={styles.itemLeft}>
                          <View style={[styles.itemIconContainer]}>
                            {getItemIcon(item.type)}
                          </View>
                          <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            {item.description && (
                              <Text style={styles.itemDescription}>{item.description}</Text>
                            )}
                            <View style={styles.itemMeta}>
                              {item.size && (
                                <Text style={styles.itemMetaText}>{item.size}</Text>
                              )}
                              {item.duration && (
                                <Text style={styles.itemMetaText}>• {item.duration}</Text>
                              )}
                              {item.dueDate && (
                                <Text style={[styles.itemMetaText, styles.dueDate]}>• {item.dueDate}</Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View style={styles.itemActions}>
                          {item.isCompleted !== undefined && (
                            <View style={styles.completionStatus}>
                              {item.isCompleted ? (
                                <CheckCircle stroke={COLORS.success} fill={COLORS.success} width={16} height={16} />
                              ) : (
                                <Circle stroke={COLORS.gray} width={16} height={16} />
                              )}
                            </View>
                          )}
                          <TouchableOpacity style={styles.markDoneButton}>
                            <Text style={styles.markDoneText}>Mark as done</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  courseHeader: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  courseCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.xs,
    fontFamily: FONTS.bold,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    flexWrap: 'wrap',
  },
  breadcrumbText: {
    fontSize: 13,
    color: COLORS.uomPrimary,
    fontFamily: FONTS.regular,
  },
  breadcrumbSeparator: {
    fontSize: 13,
    color: COLORS.gray,
    marginHorizontal: SPACING.xs,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  sectionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      default: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.extraLightGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  collapseAllButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  collapseAllText: {
    fontSize: 12,
    color: COLORS.uomPrimary,
    fontFamily: FONTS.regular,
  },
  sectionContent: {
    paddingBottom: SPACING.xs,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    flex: 1,
  },
  itemIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  itemInfo: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.uomPrimary,
    lineHeight: 18,
    fontFamily: FONTS.medium,
  },
  itemDescription: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 16,
    fontFamily: FONTS.regular,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  itemMetaText: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
  },
  dueDate: {
    color: COLORS.error,
    fontWeight: '500',
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: SPACING.sm,
  },
  completionStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markDoneButton: {
    backgroundColor: COLORS.extraLightGray,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  markDoneText: {
    fontSize: 11,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
  },
});

export default CourseDetailScreen;