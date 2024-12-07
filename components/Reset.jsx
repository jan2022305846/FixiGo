// components/Reset.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const Reset = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent.');
      router.push('/sign-in');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <Text className="text-2xl font-bold text-center mb-6">Reset Password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        className="border px-4 py-2 rounded mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity className="bg-blue-500 py-3 rounded mb-2" onPress={handleSubmit}>
        <Text className="text-white text-center">Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-300 py-3 rounded" onPress={() => router.back()}>
        <Text className="text-center">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reset;