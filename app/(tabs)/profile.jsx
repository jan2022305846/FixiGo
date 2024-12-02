// app/tabs/profile.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold">Your Profile</Text>
      <Text className="mt-2">Name: John Doe</Text>
      <Text>Email: johndoe@example.com</Text>
      <Button title="Edit Profile" onPress={() => { /* Edit Profile Logic */ }} />
    </View>
  );
};

export default ProfileScreen;
