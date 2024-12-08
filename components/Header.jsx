import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Modal, Text, Pressable } from 'react-native';
import { images, icons } from '../constants'; // Adjust the import path as necessary
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'You have been logged out successfully.');
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View className="absolute top-0 left-0 right-0 z-10 bg-primary">
      <View className="max-w-[80vh] justify-center min-h-[20vh] px-4 py-4">
        <View className="max-w-[80vh] flex-row items-center justify-between">
          <Image source={images.logo} className="w-[95px] h-[95px] ml-0 my-auto" />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={icons.logout} className="w-6 h-6 mr-5" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className="text-lg font-bold mb-4">Confirm Logout</Text>
            <Text className="text-base mb-6">Are you sure you want to logout?</Text>
            <View className="flex-row justify-end">
              <Pressable
                className="mr-4"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-blue-500">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleLogout();
                }}
              >
                <Text className="text-red-500">Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;