import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { toggleFavorite, saveFavorites } from '../redux/coursesSlice';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.courses.favorites);

  const toggleCourseFavorite = async (courseId: string) => {
    dispatch(toggleFavorite(courseId));
    
    // Save to secure storage
    const updatedFavorites = favorites.includes(courseId)
      ? favorites.filter(id => id !== courseId)
      : [...favorites, courseId];
    
    dispatch(saveFavorites(updatedFavorites));
  };

  const isFavorite = (courseId: string) => favorites.includes(courseId);

  return {
    favorites,
    toggleCourseFavorite,
    isFavorite,
  };
};

export const useValidation = () => {
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!email.includes('@')) return 'Please enter a valid email';
    if (!email.endsWith('@uom.ac.lk')) return 'Please use your UOM email address';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  return {
    validateEmail,
    validatePassword,
    validateName,
  };
};
