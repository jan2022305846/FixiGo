// app/tabs/index.jsx
import React from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';

const HomeScreen = () => {

  const handleLookForMechanic = () => {
    // Placeholder function for button press
    console.log('Look for Mechanic button pressed');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView> 
        <View className="max-w-[80vh] justify-center min-h-[65vh] px-4 py-4">
          <Image source={images.logo} className="w-[95px] h-[95px] ml-0 my-auto" />
          <View className="flex-1 bg-gray-300 my-auto rounded-lg justify-center">
            <Text className="text-center text-lg text-gray-700">Map Placeholder</Text>
          </View>
        </View>
        <View className="max-w-[80vh] justify-center min-h-[15vh] px-4 py-4">
          <CustomButton
            title="Look for Mechanics"
            handlePress={handleLookForMechanic}
            containerStyles="mx-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
