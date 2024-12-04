import React from 'react';
import { Image, View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import "../styles.css";
const { width } = Dimensions.get('window'); // Get device width for full-screen effect

const OnBoard = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* First Onboarding Screen */}
        <View className="justify-center items-center px-4 pb-20" style={{ width }}>
          <Image 
            source={images.card1}
            className="w-[250px] h-[200px]"
            resizeMode="contain"
          />
          <View className="mt-5">
            <Text className="text-xl text-white font-bold text-center">
              Find trusted mechanics near you with just a tap
            </Text>
          </View>
        </View>

        {/* Second Onboarding Screen */}
        <View className="justify-between items-center px-4" style={{ width, flex: 1 }}>
          <View className="justify-center items-center flex-1">
            <Image 
              source={images.card2} // Assuming you have a second image in `images`
              className="w-[250px] h-[200px]"
              resizeMode="contain"
            />
            <View className="mt-5">
              <Text className="text-xl text-white font-bold text-center">
                Reliable mechanics, anytime, anywhere
              </Text>
            </View>
          </View>
          
          {/* Button at the bottom of the second screen */}
          <CustomButton 
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-11/12 mb-8" //  Adjust width and bottom margin for spacing
          />
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default OnBoard;
