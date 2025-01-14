import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkThemeActive, setIsDarkThemeActive] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = JSON.parse(window.localStorage.getItem('isDarkThemeActive'));
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const initTheme = savedTheme !== null ? savedTheme : prefersDarkScheme;

      setIsDarkThemeActive(initTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('isDarkThemeActive', JSON.stringify(isDarkThemeActive));
    }
  }, [isDarkThemeActive]);

  const toggleTheme = () => {
    const newTheme = !isDarkThemeActive;
    
    setIsDarkThemeActive(newTheme);

    window.localStorage.setItem('isDarkThemeActive', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ isDarkThemeActive, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
