import React from 'react';
import { Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { images } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router'; // Correctly import useRouter
import CustomButton from '../components/CustomButton';

import "../styles.css";

const { width } = Dimensions.get('window'); // Get device width for full-screen effect

const OnBoard = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('../assets/video/repair.mp4')} // Adjust the path to your video file
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />
          <View className="justify-between items-center px-4" style={{ width, flex: 1 }}>
          <View className="justify-center items-center flex-1">
            <Image 
              source={images.mechanic} // Assuming you have a second image in `images`
              className="w-[250px] h-[200px]"
              resizeMode="contain"
            />
            <View className="mt-5">
              <Text className="text-2xl text-white font-pextrabold text-center mb-4">
                Welcome to FixiGo
              </Text>
              <Text className="text-xl text-white font-psemibold text-center">
                Your on-the-go mechanic locator
              </Text>
              <Text className="text-xl text-white font-psemibold text-center">
                Tap to get started
              </Text>
            </View>
          </View>
          
          <CustomButton 
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-11/12 mb-24" //  Adjust width and bottom margin for spacing
          />
        </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the background is transparent
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 48, 0.75)', // Adjust the color and opacity as needed
  },
});

export default OnBoard;