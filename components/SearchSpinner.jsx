import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Ensure correct import
import loader from '../constants/loader'; // Ensure correct import

const SearchSpinner = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loader.search}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default SearchSpinner;
