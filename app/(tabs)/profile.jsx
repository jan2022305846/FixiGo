// app/tabs/profile.jsx
import React from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import { images } from '../../constants';

const ProfileScreen = () => {
  const handleLogout = () => {
    // Placeholder function for logout
    console.log('Logout button pressed');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <ScrollView className="mt-[20vh]">
          <View className="max-w-[80vh] justify-center min-h-[15vh] px-4 py-4 flex-row items-center">
            <Image source={images.profile} className="w-[95px] h-[95px] mr-4" />
            <View>
              <Text className="text-lg text-gray-800 font-semibold">John Doe</Text>
              <Text className="text-md text-gray-600">johndoe@gmail.com</Text>
            </View>
          </View>
          <View className="max-w-[80vh] justify-center min-h-[15vh] px-4 py-4">
            <CustomButton
              title="Edit Profile"
              handlePress={handleLogout}
              containerStyles="mx-7"
              isLoading={false}
            />
          </View>
          <View className="max-w-[80vh] justify-center min-h-[15vh] px-4 py-4">
            <CustomButton
              title="Logout"
              handlePress={handleLogout}
              containerStyles="mx-7"
              isLoading={false}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
