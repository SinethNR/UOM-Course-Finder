import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { User, Mail, Book, Heart, LogOut, Settings } from 'react-native-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFavorites } from '../../hooks';
import { logoutUser } from '../../redux/authSlice';
import { clearFavorites } from '../../redux/coursesSlice';
import Button from '../../components/Button';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../../utils/styles';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { courses } = useAppSelector(state => state.courses);
  const { favorites } = useFavorites();

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

  const handleClearFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to clear all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => dispatch(clearFavorites()) 
        },
      ]
    );
  };

  const ProfileItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    value?: string;
    onPress?: () => void;
    showArrow?: boolean;
  }> = ({ icon, title, value, onPress, showArrow = false }) => (
    <TouchableOpacity 
      style={styles.profileItem} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.profileItemLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={styles.profileItemTitle}>{title}</Text>
      </View>
      {value && (
        <Text style={styles.profileItemValue}>{value}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User stroke={COLORS.white} width={40} height={40} />
          </View>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{courses.length}</Text>
          <Text style={styles.statLabel}>Available Courses</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <ProfileItem
          icon={<User stroke={COLORS.uomPrimary} width={20} height={20} />}
          title="Full Name"
          value={user?.name}
        />
        
        <ProfileItem
          icon={<Mail stroke={COLORS.uomPrimary} width={20} height={20} />}
          title="Email Address"
          value={user?.email}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <ProfileItem
          icon={<Heart stroke={COLORS.uomPrimary} width={20} height={20} />}
          title="Manage Favorites"
          onPress={handleClearFavorites}
          showArrow
        />
        
        <ProfileItem
          icon={<Settings stroke={COLORS.uomPrimary} width={20} height={20} />}
          title="App Settings"
          onPress={() => Alert.alert('Coming Soon', 'Settings feature will be available soon.')}
          showArrow
        />
      </View>

      <View style={styles.actionContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          fullWidth
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          UOM Course Finder v1.0.0{'\n'}
          University of Moratuwa
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.uomPrimary,
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.uomPrimary,
    borderWidth: 3,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white + 'DD',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SPACING.md,
  },
  statValue: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
    color: COLORS.uomPrimary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.uomPrimary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  profileItemTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    flex: 1,
  },
  profileItemValue: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  actionContainer: {
    padding: SPACING.lg,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  footerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProfileScreen;
