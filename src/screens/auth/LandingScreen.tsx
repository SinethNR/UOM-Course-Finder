import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Star,
  MapPin,
  Globe,
} from 'react-native-feather';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../../utils/styles';

const { width, height } = Dimensions.get('window');

interface LandingScreenProps {
  navigation: any;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Logo rotation animation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.uomPrimary} />
      
      {/* Background Gradient */}
      <View style={styles.backgroundGradient} />
      
      {/* Floating Elements */}
      <View style={styles.floatingElements}>
        <Animated.View style={[styles.floatingIcon, styles.floating1, { opacity: fadeAnim }]}>
          <BookOpen stroke={COLORS.white} width={20} height={20} />
        </Animated.View>
        <Animated.View style={[styles.floatingIcon, styles.floating2, { opacity: fadeAnim }]}>
          <Award stroke={COLORS.white} width={18} height={18} />
        </Animated.View>
        <Animated.View style={[styles.floatingIcon, styles.floating3, { opacity: fadeAnim }]}>
          <Users stroke={COLORS.white} width={16} height={16} />
        </Animated.View>
        <Animated.View style={[styles.floatingIcon, styles.floating4, { opacity: fadeAnim }]}>
          <TrendingUp stroke={COLORS.white} width={14} height={14} />
        </Animated.View>
      </View>      <Animated.ScrollView 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo and University Header */}
        <View style={styles.headerSection}>
          <Animated.View 
            style={[
              styles.logoContainer,
              { 
                transform: [
                  { scale: scaleAnim },
                  { rotate: rotateInterpolate }
                ] 
              }
            ]}
          >
            <View style={styles.logo}>
              <BookOpen stroke={COLORS.white} width={40} height={40} />
            </View>
          </Animated.View>
          
          <Text style={styles.universityName}>University of Moratuwa</Text>
          <Text style={styles.facultyName}>Faculty of Information Technology</Text>
          
          <View style={styles.locationContainer}>
            <MapPin stroke={COLORS.white} width={16} height={16} />
            <Text style={styles.locationText}>Moratuwa, Sri Lanka</Text>
          </View>
        </View>

        {/* App Title and Tagline */}
        <View style={styles.titleSection}>
          <Text style={styles.appTitle}>Course Finder</Text>
          <Text style={styles.tagline}>
            Discover, Explore & Excel in Your Academic Journey
          </Text>
          <Text style={styles.description}>
            Your comprehensive guide to courses, grades, and academic success at UOM
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <BookOpen stroke={COLORS.uomPrimary} width={24} height={24} />
              </View>
              <Text style={styles.featureTitle}>Course Catalog</Text>
              <Text style={styles.featureDescription}>
                Browse comprehensive course information
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Star stroke={COLORS.warning} width={24} height={24} />
              </View>
              <Text style={styles.featureTitle}>Favorites</Text>
              <Text style={styles.featureDescription}>
                Save and organize your preferred courses
              </Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <TrendingUp stroke={COLORS.success} width={24} height={24} />
              </View>
              <Text style={styles.featureTitle}>Grade Tracking</Text>
              <Text style={styles.featureDescription}>
                Monitor your academic progress
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Users stroke={COLORS.uomSecondary} width={24} height={24} />
              </View>
              <Text style={styles.featureTitle}>Student Profile</Text>
              <Text style={styles.featureDescription}>
                Comprehensive academic dashboard
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Join Thousands of Students</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15,000+</Text>
              <Text style={styles.statLabel}>Active Students</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Faculties</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.getStartedButton} 
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <ArrowRight stroke={COLORS.white} width={20} height={20} />
          </TouchableOpacity>
          
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>
              Already have an account?{' '}
              <Text 
                style={styles.loginLink} 
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>
            © 2024 University of Moratuwa{'\n'}
            All rights reserved
          </Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialIcon}>
              <Globe stroke={COLORS.white} width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.uomPrimary,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.uomPrimary,
    opacity: 0.95,
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floating1: {
    top: height * 0.15,
    right: width * 0.1,
  },
  floating2: {
    top: height * 0.3,
    left: width * 0.05,
  },
  floating3: {
    top: height * 0.6,
    right: width * 0.15,
  },
  floating4: {
    bottom: height * 0.2,
    left: width * 0.1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: height * 0.08,
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  universityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    fontFamily: FONTS.bold,
  },
  facultyName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  locationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    fontFamily: FONTS.bold,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.md,
  },
  featuresSection: {
    marginBottom: SPACING.xl,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
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
    }),
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    fontFamily: FONTS.bold,
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
  statsSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontFamily: FONTS.bold,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs / 2,
    fontFamily: FONTS.bold,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: SPACING.md,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    gap: SPACING.sm,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
    marginBottom: SPACING.lg,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.uomPrimary,
    fontFamily: FONTS.bold,
  },
  loginPrompt: {
    marginTop: SPACING.md,
  },
  loginPromptText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loginLink: {
    fontWeight: 'bold',
    color: COLORS.white,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  footerDivider: {
    width: '50%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: SPACING.lg,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;
