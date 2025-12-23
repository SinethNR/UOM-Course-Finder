import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Mail, Lock } from 'react-native-feather';
import { AuthStackParamList } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useValidation } from '../../hooks';
import { loginUser, clearError } from '../../redux/authSlice';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { COLORS, SPACING, FONTS, LAYOUT, SCREEN_WIDTH } from '../../utils/styles';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const { validateEmail, validatePassword } = useValidation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        { text: 'OK', onPress: () => dispatch(clearError()) }
      ]);
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email) || '',
      password: validatePassword(formData.password) || '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleLogin = async () => {
    if (validateForm()) {
      dispatch(loginUser(formData));
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>UOM</Text>
            </View>
            <Text style={styles.title}>Course Finder</Text>
            <Text style={styles.subtitle}>Find and manage your courses easily</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Email"
              placeholder="Enter your UOM email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={<Mail stroke={COLORS.gray} width={20} height={20} />}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              error={errors.password}
              isPassword={true}
              leftIcon={<Lock stroke={COLORS.gray} width={20} height={20} />}
            />

            <Button
              title="Login"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.divider}>
              <Text style={styles.dividerText}>Don't have an account?</Text>
            </View>

            <Button
              title="Create Account"
              onPress={() => navigation.navigate('Register')}
              variant="outline"
              fullWidth
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Demo Credentials:{'\n'}
              Email: student@uom.ac.lk{'\n'}
              Password: password123
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  contentContainer: {
    maxWidth: LAYOUT.maxFormWidth,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.uomPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  formContainer: {
    paddingBottom: SPACING.xxl,
  },
  loginButton: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  divider: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dividerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  footer: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  footerText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginScreen;
