import React from 'react';
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { ThemeProvider as CustomThemeProvider, useTheme } from './ThemeContext';

import { lightTheme, darkTheme } from './index';
import Header from '../Header';
import { baseStyles } from '../styles/GlobalStyles';
import { styles } from '../../custom/styles/styles';

const ThemeWrapper = ({ children, location }) => {
  const { isDarkThemeActive, toggleTheme } = useTheme();

  const currentActiveTheme = isDarkThemeActive ? darkTheme : lightTheme;

  return (
    <div>
      <Global styles={[baseStyles, ...styles]} />
      <Header location={location} isDarkThemeActive={isDarkThemeActive} toggleActiveTheme={toggleTheme} />
      <EmotionThemeProvider theme={currentActiveTheme}>{children}</EmotionThemeProvider>
    </div>
  );
};

const ThemeProvider = ({ children, location }) => (
  <CustomThemeProvider>
    <ThemeWrapper location={location}>{children}</ThemeWrapper>
  </CustomThemeProvider>
);

export default ThemeProvider;
