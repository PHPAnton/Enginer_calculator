import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import HomeScreen from './HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Учет статуса бара на Android
  },
});

export default App;
