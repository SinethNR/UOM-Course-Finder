import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Mail, Lock, User } from 'react-native-feather';
import { AuthStackParamList } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useValidation } from '../../hooks';
import { registerUser, clearError } from '../../redux/authSlice';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { COLORS, SPACING, FONTS, LAYOUT } from '../../utils/styles';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const { validateEmail, validatePassword, validateName } = useValidation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error, [
        { text: 'OK', onPress: () => dispatch(clearError()) }
      ]);
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name) || '',
      email: validateEmail(formData.email) || '',
      password: validatePassword(formData.password) || '',
      confirmPassword: '',
    };

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleRegister = async () => {
    if (validateForm()) {
      dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }));
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
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join UOM Course Finder today</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              error={errors.name}
              autoCapitalize="words"
              leftIcon={<User stroke={COLORS.gray} width={20} height={20} />}
            />

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

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              error={errors.confirmPassword}
              isPassword={true}
              leftIcon={<Lock stroke={COLORS.gray} width={20} height={20} />}
            />

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
              style={styles.registerButton}
            />

            <View style={styles.divider}>
              <Text style={styles.dividerText}>Already have an account?</Text>
            </View>

            <Button
              title="Back to Login"
              onPress={() => navigation.goBack()}
              variant="outline"
              fullWidth
            />
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
  header: {
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
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
    paddingBottom: SPACING.xl,
  },
  registerButton: {
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
});

export default RegisterScreen;
