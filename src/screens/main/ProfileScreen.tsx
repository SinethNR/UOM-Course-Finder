import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
  Animated,
  StatusBar,
  RefreshControl,
  Share,
} from 'react-native';
import { 
  User, 
  Mail, 
  Book, 
  Heart, 
  LogOut, 
  Settings,
  Calendar,
  Award,
  Clock,
  MapPin,
  Phone,
  Globe,
  Edit3,
  Camera,
  BookOpen,
  Users,
  TrendingUp,
  Activity,
  FileText,
  Download,
  Bell,
  Star,
  Target,
  Zap,
  Share2,
  BarChart,
  PieChart,
  Layers,
  Wifi,
  WifiOff,
  CheckCircle,
} from 'react-native-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFavorites } from '../../hooks';
import { logoutUser } from '../../redux/authSlice';
import { clearFavorites } from '../../redux/coursesSlice';
import Button from '../../components/Button';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../../utils/styles';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { courses } = useAppSelector(state => state.courses);
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'courses' | 'activity' | 'achievements'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.95))[0];

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Mock network status check
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };
  // Enhanced Mock student data with advanced features
  const studentProfile = {
    studentId: '224135V',
    faculty: 'Faculty of Information Technology',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    semester: 'Semester 1, 2024/2025',
    gpa: '3.85',
    completedCourses: 45,
    totalCredits: 135,
    profilePicture: null,
    joinDate: 'September 2021',
    lastAccess: '2 minutes ago',
    country: 'Sri Lanka',
    city: 'Moratuwa',
    phone: '+94 77 123 4567',
    interests: ['Machine Learning', 'Web Development', 'Data Science', 'Mobile Development', 'UI/UX Design'],
    skills: ['React Native', 'Python', 'JavaScript', 'Java', 'SQL', 'TypeScript', 'Node.js', 'MongoDB'],
    coursework: [
      { code: 'CS3042', name: 'Database Systems', grade: 'A', credits: 3, semester: 'Sem 1, 2024', progress: 95 },
      { code: 'CS3052', name: 'Software Engineering', grade: 'A-', credits: 3, semester: 'Sem 1, 2024', progress: 88 },
      { code: 'CS3712', name: 'Machine Learning', grade: 'B+', credits: 3, semester: 'Sem 2, 2023', progress: 82 },
      { code: 'CS3821', name: 'Mobile App Development', grade: 'A', credits: 3, semester: 'Sem 2, 2023', progress: 94 },
      { code: 'CS3022', name: 'Data Structures & Algorithms', grade: 'A', credits: 4, semester: 'Sem 1, 2023', progress: 92 },
      { code: 'CS3302', name: 'Computer Networks', grade: 'B+', credits: 3, semester: 'Sem 2, 2023', progress: 85 },
    ],
    recentActivity: [
      { type: 'submission', title: 'Assignment 2 - Database Design', course: 'CS3042', time: '2 hours ago', status: 'completed' },
      { type: 'quiz', title: 'Quiz 3 - SQL Queries', course: 'CS3042', time: '1 day ago', status: 'graded', score: '18/20' },
      { type: 'forum', title: 'Posted in Software Requirements Discussion', course: 'CS3052', time: '2 days ago', status: 'active' },
      { type: 'download', title: 'Downloaded Lecture Notes Week 8', course: 'CS3712', time: '3 days ago', status: 'accessed' },
      { type: 'submission', title: 'Project Phase 1 Submission', course: 'CS3052', time: '1 week ago', status: 'graded', score: '45/50' },
    ],
    achievements: [
      { id: 1, title: 'Dean\'s List', description: 'Maintained GPA above 3.8 for 3 consecutive semesters', icon: 'trophy', color: '#FFD700', earned: true, date: 'Nov 2024' },
      { id: 2, title: 'Perfect Attendance', description: 'Attended all lectures for Semester 1, 2024', icon: 'checkCircle', color: '#28A745', earned: true, date: 'Dec 2024' },
      { id: 3, title: 'Research Pioneer', description: 'Published a paper in IEEE Conference', icon: 'star', color: '#17A2B8', earned: true, date: 'Oct 2024' },
      { id: 4, title: 'Coding Master', description: 'Complete 100 programming assignments', icon: 'zap', color: '#6F42C1', earned: false, progress: 85 },
      { id: 5, title: 'Team Player', description: 'Complete 10 group projects successfully', icon: 'users', color: '#FD7E14', earned: true, date: 'Sep 2024' },
      { id: 6, title: 'Early Bird', description: 'Submit 20 assignments before deadline', icon: 'clock', color: '#20C997', earned: false, progress: 16 },
    ],
    gpaHistory: [
      { semester: 'Sem 1, 2022', gpa: 3.45 },
      { semester: 'Sem 2, 2022', gpa: 3.62 },
      { semester: 'Sem 1, 2023', gpa: 3.71 },
      { semester: 'Sem 2, 2023', gpa: 3.78 },
      { semester: 'Sem 1, 2024', gpa: 3.85 },
    ],
    notifications: [
      { id: 1, title: 'Assignment Due Tomorrow', message: 'CS3042 Database Design due Dec 25', type: 'warning', time: '1 hour ago', read: false },
      { id: 2, title: 'Grade Released', message: 'Your CS3052 Quiz result is available', type: 'info', time: '3 hours ago', read: false },
      { id: 3, title: 'New Announcement', message: 'CS3712 Final Exam scheduled for Jan 15', type: 'info', time: '1 day ago', read: true },
    ],
    socialStats: {
      peers: 156,
      studyGroups: 8,
      projectsCollaborated: 23,
      helpfulReplies: 45,
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => dispatch(logoutUser()) 
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality will be available soon.');
  };

  const handleChangePhoto = () => {
    Alert.alert('Change Photo', 'Photo upload functionality will be available soon.');
  };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `Check out ${user?.name || 'my'} academic profile at University of Moratuwa! 🎓\nStudent ID: ${studentProfile.studentId}\nGPA: ${studentProfile.gpa}\nDepartment: ${studentProfile.department}`,
        title: 'My Academic Profile',
      });
    } catch (error) {
      console.log('Error sharing profile:', error);
    }
  };

  const handleNotificationPress = (notification: any) => {
    Alert.alert(notification.title, notification.message);
  };
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Award width={24} height={24} />;
      case 'checkCircle': return <CheckCircle width={24} height={24} />;
      case 'star': return <Star width={24} height={24} />;
      case 'zap': return <Zap width={24} height={24} />;
      case 'users': return <Users width={24} height={24} />;
      case 'clock': return <Clock width={24} height={24} />;
      default: return <Award width={24} height={24} />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission': return <FileText stroke={COLORS.success} width={16} height={16} />;
      case 'quiz': return <Award stroke={COLORS.warning} width={16} height={16} />;
      case 'forum': return <Users stroke={COLORS.uomPrimary} width={16} height={16} />;
      case 'download': return <Download stroke={COLORS.uomSecondary} width={16} height={16} />;
      default: return <Activity stroke={COLORS.gray} width={16} height={16} />;
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'graded': return COLORS.uomPrimary;
      case 'active': return COLORS.warning;
      case 'accessed': return COLORS.gray;
      default: return COLORS.text;
    }
  };
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.uomPrimary} />
      
      {/* Enhanced Profile Header with notifications and actions */}
      <View style={styles.profileHeader}>
        <View style={styles.coverPhoto}>
          {/* Header Actions */}
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction} onPress={handleShareProfile}>
              <Share2 stroke={COLORS.white} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerAction, styles.notificationButton]} 
              onPress={() => Alert.alert('Notifications', `You have ${studentProfile.notifications.filter(n => !n.read).length} unread notifications`)}
            >
              <Bell stroke={COLORS.white} width={20} height={20} />
              {studentProfile.notifications.filter(n => !n.read).length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {studentProfile.notifications.filter(n => !n.read).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.networkStatus}>
              {isOnline ? (
                <Wifi stroke={COLORS.white} width={16} height={16} />
              ) : (
                <WifiOff stroke={COLORS.error} width={16} height={16} />
              )}
            </View>
          </View>

          <View style={styles.profilePhotoContainer}>
            <TouchableOpacity onPress={handleChangePhoto} style={styles.profilePhoto}>
              {studentProfile.profilePicture ? (
                <Image source={{ uri: studentProfile.profilePicture }} style={styles.profileImage} />
              ) : (
                <User stroke={COLORS.white} width={50} height={50} />
              )}
              <View style={styles.photoOverlay}>
                <Camera stroke={COLORS.white} width={16} height={16} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <View style={styles.nameSection}>
              <Text style={styles.studentName}>{user?.name || 'Student Name'}</Text>
              <View style={styles.verifiedBadge}>
                <CheckCircle stroke={COLORS.success} width={16} height={16} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
              <Edit3 stroke={COLORS.uomPrimary} width={16} height={16} />
            </TouchableOpacity>
          </View>
          <Text style={styles.studentId}>Student ID: {studentProfile.studentId}</Text>
          <Text style={styles.department}>{studentProfile.department}</Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.onlineStatus, { backgroundColor: isOnline ? COLORS.success : COLORS.error }]} />
            <Text style={styles.lastAccess}>
              {isOnline ? `Online • ${studentProfile.lastAccess}` : 'Offline'}
            </Text>
          </View>
        </View>
      </View>      {/* Enhanced Tab Navigation */}
      <View style={styles.tabNavigation}>
        {[
          { key: 'overview', label: 'Overview', icon: <TrendingUp width={18} height={18} /> },
          { key: 'details', label: 'Details', icon: <User width={18} height={18} /> },
          { key: 'courses', label: 'Courses', icon: <BookOpen width={18} height={18} /> },
          { key: 'achievements', label: 'Awards', icon: <Award width={18} height={18} /> },
          { key: 'activity', label: 'Activity', icon: <Activity width={18} height={18} /> },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            {React.cloneElement(tab.icon, { 
              stroke: activeTab === tab.key ? COLORS.uomPrimary : COLORS.gray 
            })}
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>      {/* Enhanced Tab Content with Pull-to-Refresh */}
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[COLORS.uomPrimary]}
            tintColor={COLORS.uomPrimary}
          />
        }
      >
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            {/* Enhanced Academic Stats with gradients and animations */}
            <View style={styles.statsGrid}>              <View style={[styles.statCard, styles.gpaCard]}>
                <View style={styles.statIconContainer}>
                  <BookOpen stroke={COLORS.white} width={24} height={24} />
                </View>
                <Text style={[styles.statValue, styles.gpaValue]}>{studentProfile.gpa}</Text>
                <Text style={styles.statLabel}>Current GPA</Text>
                <View style={styles.trendIndicator}>
                  <TrendingUp stroke={COLORS.success} width={12} height={12} />
                  <Text style={styles.trendText}>+0.07</Text>
                </View>
              </View>
              
              <View style={[styles.statCard, styles.coursesCard]}>
                <View style={styles.statIconContainer}>
                  <BookOpen stroke={COLORS.white} width={24} height={24} />
                </View>
                <Text style={styles.statValue}>{studentProfile.completedCourses}</Text>
                <Text style={styles.statLabel}>Courses Completed</Text>
                <Text style={styles.progressText}>90% of degree</Text>
              </View>
              
              <View style={[styles.statCard, styles.creditsCard]}>
                <View style={styles.statIconContainer}>
                  <Award stroke={COLORS.white} width={24} height={24} />
                </View>
                <Text style={styles.statValue}>{studentProfile.totalCredits}</Text>
                <Text style={styles.statLabel}>Total Credits</Text>
                <Text style={styles.progressText}>15 credits remaining</Text>
              </View>
              
              <View style={[styles.statCard, styles.favoritesCard]}>
                <View style={styles.statIconContainer}>
                  <Heart stroke={COLORS.white} width={24} height={24} />
                </View>
                <Text style={styles.statValue}>{favorites.length}</Text>
                <Text style={styles.statLabel}>Favorites</Text>
                <Text style={styles.progressText}>Quick access</Text>
              </View>
            </View>

            {/* Academic Performance Chart */}
            <View style={styles.section}>              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>GPA Progression</Text>
                <BarChart stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
              <View style={styles.chartContainer}>
                {studentProfile.gpaHistory.map((item, index) => (
                  <View key={index} style={styles.chartBar}>
                    <View 
                      style={[
                        styles.barFill, 
                        { 
                          height: `${(item.gpa / 4.0) * 100}%`,
                          backgroundColor: item.gpa >= 3.7 ? COLORS.success : item.gpa >= 3.0 ? COLORS.warning : COLORS.error
                        }
                      ]} 
                    />
                    <Text style={styles.barValue}>{item.gpa}</Text>
                    <Text style={styles.barLabel}>{item.semester.split(' ')[0]}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Quick Achievement Highlights */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Achievements</Text>
                <TouchableOpacity onPress={() => setActiveTab('achievements')}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.achievementsList}>
                {studentProfile.achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
                  <View key={achievement.id} style={styles.achievementItem}>
                    <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                      {React.cloneElement(getAchievementIcon(achievement.icon), { 
                        stroke: achievement.color, 
                        width: 20, 
                        height: 20 
                      })}
                    </View>
                    <View style={styles.achievementInfo}>
                      <Text style={styles.achievementTitle}>{achievement.title}</Text>
                      <Text style={styles.achievementDate}>{achievement.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Academic Progress */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Academic Progress</Text>
              <View style={styles.progressInfo}>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>Current Year</Text>
                  <Text style={styles.progressValue}>{studentProfile.year}</Text>
                </View>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>Semester</Text>
                  <Text style={styles.progressValue}>{studentProfile.semester}</Text>
                </View>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>Department</Text>
                  <Text style={styles.progressValue}>{studentProfile.department}</Text>
                </View>
              </View>
            </View>

            {/* Recent Coursework */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Coursework</Text>
              {studentProfile.coursework.slice(0, 3).map((course, index) => (
                <View key={index} style={styles.courseItem}>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseCode}>{course.code}</Text>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseSemester}>{course.semester}</Text>
                  </View>
                  <View style={styles.gradeContainer}>
                    <Text style={[styles.grade, { color: course.grade.startsWith('A') ? COLORS.success : course.grade.startsWith('B') ? COLORS.warning : COLORS.gray }]}>
                      {course.grade}
                    </Text>
                    <Text style={styles.credits}>{course.credits} Credits</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}        {activeTab === 'details' && (
          <View style={styles.tabContent}>
            {/* Personal Information with enhanced styling */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <User stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
              
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <User stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Full Name</Text>
                  <Text style={styles.detailValue}>{user?.name || 'Student Name'}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <Mail stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Email Address</Text>
                  <Text style={styles.detailValue}>{user?.email || ''}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <Phone stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Phone Number</Text>
                  <Text style={styles.detailValue}>{studentProfile.phone}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <MapPin stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{studentProfile.city}, {studentProfile.country}</Text>
                </View>
              </View>
            </View>

            {/* Academic Information */}
            <View style={styles.section}>              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Academic Information</Text>
                <BookOpen stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
                <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <BookOpen stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Student ID</Text>
                  <Text style={styles.detailValue}>{studentProfile.studentId}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <BookOpen stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Faculty</Text>
                  <Text style={styles.detailValue}>{studentProfile.faculty}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <Calendar stroke={COLORS.uomPrimary} width={20} height={20} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>Joined</Text>
                  <Text style={styles.detailValue}>{studentProfile.joinDate}</Text>
                </View>
              </View>
            </View>

            {/* Social & Collaboration Stats */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Social & Collaboration</Text>
                <Users stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
              <View style={styles.socialStatsGrid}>
                <View style={styles.socialStatItem}>
                  <Users stroke={COLORS.uomPrimary} width={16} height={16} />
                  <Text style={styles.socialStatValue}>{studentProfile.socialStats.peers}</Text>
                  <Text style={styles.socialStatLabel}>Peers Connected</Text>
                </View>
                <View style={styles.socialStatItem}>
                  <Layers stroke={COLORS.success} width={16} height={16} />
                  <Text style={styles.socialStatValue}>{studentProfile.socialStats.studyGroups}</Text>
                  <Text style={styles.socialStatLabel}>Study Groups</Text>
                </View>
                <View style={styles.socialStatItem}>
                  <Target stroke={COLORS.warning} width={16} height={16} />
                  <Text style={styles.socialStatValue}>{studentProfile.socialStats.projectsCollaborated}</Text>
                  <Text style={styles.socialStatLabel}>Projects</Text>
                </View>
                <View style={styles.socialStatItem}>
                  <Heart stroke={COLORS.error} width={16} height={16} />
                  <Text style={styles.socialStatValue}>{studentProfile.socialStats.helpfulReplies}</Text>
                  <Text style={styles.socialStatLabel}>Helpful Replies</Text>
                </View>
              </View>
            </View>

            {/* Skills & Interests with enhanced tags */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Skills & Interests</Text>
                <Zap stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
              
              <View style={styles.tagContainer}>
                <Text style={styles.tagTitle}>Skills:</Text>
                <View style={styles.tagRow}>
                  {studentProfile.skills.map((skill, index) => (
                    <View key={index} style={[styles.tag, styles.skillTag]}>
                      <Text style={styles.tagText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.tagContainer}>
                <Text style={styles.tagTitle}>Interests:</Text>
                <View style={styles.tagRow}>
                  {studentProfile.interests.map((interest, index) => (
                    <View key={index} style={[styles.tag, styles.interestTag]}>
                      <Text style={styles.tagText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}        {activeTab === 'courses' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Course Performance</Text>
                <PieChart stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
              {studentProfile.coursework.map((course, index) => (
                <View key={index} style={styles.enhancedCourseItem}>
                  <View style={styles.courseInfo}>
                    <View style={styles.courseHeader}>
                      <Text style={styles.courseCode}>{course.code}</Text>
                      <View style={[styles.gradeContainer, { backgroundColor: course.grade.startsWith('A') ? COLORS.success + '15' : course.grade.startsWith('B') ? COLORS.warning + '15' : COLORS.error + '15' }]}>
                        <Text style={[styles.grade, { color: course.grade.startsWith('A') ? COLORS.success : course.grade.startsWith('B') ? COLORS.warning : COLORS.error }]}>
                          {course.grade}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseSemester}>{course.semester} • {course.credits} Credits</Text>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: course.grade.startsWith('A') ? COLORS.success : course.grade.startsWith('B') ? COLORS.warning : COLORS.error }]} />
                      </View>
                      <Text style={styles.progressPercentage}>{course.progress}%</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'achievements' && (
          <View style={styles.tabContent}>
            {/* Earned Achievements */}            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Earned Achievements</Text>
                <Award stroke={COLORS.warning} width={20} height={20} />
              </View>
              {studentProfile.achievements.filter(a => a.earned).map((achievement) => (
                <View key={achievement.id} style={styles.fullAchievementItem}>
                  <View style={[styles.achievementIconLarge, { backgroundColor: achievement.color + '20', borderColor: achievement.color }]}>
                    {React.cloneElement(getAchievementIcon(achievement.icon), { 
                      stroke: achievement.color, 
                      width: 28, 
                      height: 28 
                    })}
                  </View>
                  <View style={styles.achievementDetails}>
                    <Text style={styles.achievementTitleLarge}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    <View style={styles.achievementMeta}>
                      <Text style={styles.achievementDate}>Earned: {achievement.date}</Text>
                      <View style={styles.achievementBadge}>
                        <CheckCircle stroke={COLORS.success} width={12} height={12} />
                        <Text style={styles.achievementBadgeText}>Completed</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Progress Achievements */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>In Progress</Text>
                <Target stroke={COLORS.warning} width={20} height={20} />
              </View>
              {studentProfile.achievements.filter(a => !a.earned).map((achievement) => (
                <View key={achievement.id} style={styles.fullAchievementItem}>
                  <View style={[styles.achievementIconLarge, { backgroundColor: COLORS.lightGray, borderColor: COLORS.gray }]}>
                    {React.cloneElement(getAchievementIcon(achievement.icon), { 
                      stroke: COLORS.gray, 
                      width: 28, 
                      height: 28 
                    })}
                  </View>
                  <View style={styles.achievementDetails}>
                    <Text style={[styles.achievementTitleLarge, { color: COLORS.gray }]}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    <View style={styles.achievementProgress}>
                      <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                          <View style={[styles.progressFill, { width: `${achievement.progress || 0}%`, backgroundColor: COLORS.warning }]} />
                        </View>
                        <Text style={styles.progressPercentage}>{achievement.progress || 0}%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'activity' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <Activity stroke={COLORS.uomPrimary} width={20} height={20} />
              </View>
              {studentProfile.recentActivity.map((activity, index) => (
                <View key={index} style={styles.enhancedActivityItem}>
                  <View style={styles.activityIcon}>
                    {getActivityIcon(activity.type)}
                  </View>
                  <View style={styles.activityInfo}>
                    <View style={styles.activityHeader}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <View style={[styles.activityStatus, { backgroundColor: getActivityStatusColor(activity.status) + '15' }]}>
                        <Text style={[styles.activityStatusText, { color: getActivityStatusColor(activity.status) }]}>
                          {activity.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.activityCourse}>{activity.course}</Text>
                    <View style={styles.activityMeta}>
                      <Text style={styles.activityTime}>{activity.time}</Text>
                      {activity.score && (
                        <Text style={styles.activityScore}>Score: {activity.score}</Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Coming Soon', 'Settings feature will be available soon.')}>
            <Settings stroke={COLORS.uomPrimary} width={20} height={20} />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
            <LogOut stroke={COLORS.error} width={20} height={20} />
            <Text style={[styles.actionButtonText, styles.logoutButtonText]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            University of Moratuwa{'\n'}
            Faculty of Information Technology{'\n'}
            Academic Year 2024/2025
          </Text>        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },  coverPhoto: {
    height: 120,
    backgroundColor: COLORS.uomPrimary,
    position: 'relative',
  },
  headerActions: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.lg,
    flexDirection: 'row',
    gap: SPACING.sm,
    zIndex: 10,
  },  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  networkStatus: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhotoContainer: {
    position: 'absolute',
    bottom: -40,
    left: SPACING.lg,
    width: 80,
    height: 80,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.uomSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    position: 'relative',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.uomPrimary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    paddingTop: 50,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  nameSection: {
    flex: 1,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
    marginBottom: SPACING.xs / 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs / 2,
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  verifiedText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '600',
  },
  editButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.sm,
  },
  studentId: {
    fontSize: 14,
    color: COLORS.uomPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs / 2,
  },
  department: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lastAccess: {
    fontSize: 12,
    color: COLORS.gray,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: SPACING.xs / 2,
  },
  activeTab: {
    borderBottomColor: COLORS.uomPrimary,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.gray,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: COLORS.uomPrimary,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  tabContent: {
    padding: SPACING.md,
  },
  
  // Enhanced Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    gap: SPACING.xs,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },  gpaCard: {
    backgroundColor: COLORS.uomPrimary,
  },
  coursesCard: {
    backgroundColor: COLORS.success,
  },
  creditsCard: {
    backgroundColor: COLORS.warning,
  },
  favoritesCard: {
    backgroundColor: COLORS.error,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  gpaValue: {
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendText: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 10,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 2,
  },
  
  // Enhanced Section Styles
  section: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
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
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.uomPrimary,
    fontWeight: '600',
  },
  
  // Chart Styles
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    marginHorizontal: 2,
  },
  barFill: {
    width: '80%',
    borderRadius: 4,
    position: 'absolute',
    bottom: 24,
  },
  barValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.text,
    position: 'absolute',
    bottom: 12,
  },
  barLabel: {
    fontSize: 9,
    color: COLORS.gray,
    position: 'absolute',
    bottom: 0,
  },
  
  // Achievement Styles
  achievementsList: {
    gap: SPACING.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 11,
    color: COLORS.gray,
  },
  fullAchievementItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  achievementIconLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementTitleLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs / 2,
  },
  achievementDescription: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  achievementMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  achievementBadgeText: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '600',
  },
  achievementProgress: {
    marginTop: SPACING.xs,
  },  
  // Progress Bar Styles
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gray,
    minWidth: 32,
    textAlign: 'right',
  },

  // Enhanced Course Styles
  enhancedCourseItem: {
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  
  // Enhanced Detail Styles
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.extraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Social Stats Grid
  socialStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  socialStatItem: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    alignItems: 'center',
    gap: SPACING.xs / 2,
  },
  socialStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  socialStatLabel: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: 'center',
  },
  
  // Enhanced Tag Styles
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  
  // Enhanced Activity Styles
  enhancedActivityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs / 2,
  },
  activityStatus: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  activityStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs / 2,
  },
  activityScore: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.uomPrimary,
  },

  // Original styles (keeping the remaining ones)
  progressInfo: {
    gap: SPACING.sm,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.uomPrimary,
    marginBottom: 2,
  },
  courseName: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
  courseSemester: {
    fontSize: 12,
    color: COLORS.gray,
  },
  gradeContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  grade: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  credits: {
    fontSize: 11,
    color: COLORS.gray,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
    gap: SPACING.sm,
  },
  detailInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  tagContainer: {
    marginBottom: SPACING.md,
  },
  tagTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  tag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  skillTag: {
    backgroundColor: COLORS.uomPrimary + '15',
  },
  interestTag: {
    backgroundColor: COLORS.uomSecondary + '15',
  },
  tagText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
    gap: SPACING.sm,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.extraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  activityCourse: {
    fontSize: 12,
    color: COLORS.uomPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: COLORS.gray,
  },
  actionSection: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
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
  logoutButton: {
    backgroundColor: COLORS.error + '08',
    borderWidth: 1,
    borderColor: COLORS.error + '20',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  logoutButtonText: {
    color: COLORS.error,
  },
  footer: {
    alignItems: 'center',
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ProfileScreen;
