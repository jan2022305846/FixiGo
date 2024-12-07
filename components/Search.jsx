import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Ensure correct import
import loading from '../constants/loading';

const SearchSpinner = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loading.loads}
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
    width: 200,
    height: 200,
  },
});

export default SearchSpinner;