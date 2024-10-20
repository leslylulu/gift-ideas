import { useState, useEffect, useCallback } from 'react';
import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import { Button, StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import { PeopleProvider } from './PeopleContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PeopleProvider>
        <AppNavigator />
      </PeopleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
