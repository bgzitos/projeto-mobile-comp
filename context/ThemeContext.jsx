import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightColors = {
  background: '#FFFFFF',
  text: '#121212',
  card: '#F5F5F5',
  cardText: '#333333',
  tabBackground: '#FFFFFF',
  tabActive: '#007AFF',
  tabInactive: '#8E8E93',
  header: '#121212',
  searchBar: '#EFEFF0',
  button: '#505050',
};

const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#202020',
  cardText: '#FFFFFF',
  tabBackground: '#121212',
  tabActive: '#0A84FF',
  tabInactive: '#8E8E93',
  header: '#FFFFFF',
  searchBar: '#202020',
  button: '#505050',
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme);
  const [isLoading, setIsLoading] = useState(true);

  // efeito para carregar o tema salvo pelo usuário
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.error("Falha ao carregar tema do AsyncStorage", e);
      }
      setIsLoading(false);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('appTheme', newTheme);
    } catch (e) {
      console.error("Falha ao salvar tema no AsyncStorage", e);
    }
  };

  const currentColors = theme === 'light' ? lightColors : darkColors;

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: currentColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);