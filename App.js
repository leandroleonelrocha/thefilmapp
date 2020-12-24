/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState ,useMemo } from 'react';
import {StatusBar} from 'react-native';
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper, DarkTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation } from '@react-navigation/native';
import Navigation from './src/navigations/Navigation';
import PreferencesContext from './src/context/PreferencesContext';
export default function App(){

  const [theme, setTheme] = useState("Dark");

  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';

  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  const toggleTheme = () => {
    setTheme(theme === "Dark" ?  "light" : "Dark" )
  };
  console.log(theme)
  const preference = useMemo(

    () => ({
      toggleTheme,
      theme,

    }),
    [theme],

  );
    console.log(preference)
  return (
    <PreferencesContext.Provider value={preference}>
        <PaperProvider theme={ theme === "Dark" ? DarkThemePaper : DefaultThemePaper}>
          <StatusBar barStyle={theme === "Dark" ? 'light-content' : 'dark-content'}></StatusBar>
          <NavigationContainer theme={ theme === "Dark" ? DarkThemeNavigation : DefaultThemeNavigation}>
            <Navigation></Navigation>
          </NavigationContainer>
        </PaperProvider>
    </PreferencesContext.Provider>
  );
}