import React, { useEffect, useRef } from 'react';
import { Image, View, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { images } from '../constants';
import Loading from '../components/Loading';

import "../styles.css";

// Home screen component
const HomeScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboard');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image source={images.logo} style={styles.logo} />
        </Animated.View>
        <Loading />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A30',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20, 
  },
});

export default HomeScreen;