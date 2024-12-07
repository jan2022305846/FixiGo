// components/Loading.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '../constants/loading';

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loading.load}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    width: 120,
    height: 120, 
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default Loading;