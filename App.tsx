import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useAppDispatch, useAppSelector } from './src/hooks/redux';
import { loadStoredUser } from './src/redux/authSlice';
import { loadFavorites } from './src/redux/coursesSlice';
import RootNavigator from './src/navigation/RootNavigator';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from './src/utils/styles';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    // Load stored user data and favorites on app startup
    const initializeApp = async () => {
      await dispatch(loadStoredUser());
      await dispatch(loadFavorites());
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.uomPrimary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.uomPrimary} />
      <RootNavigator />
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
