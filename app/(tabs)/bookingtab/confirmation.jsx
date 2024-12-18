// app/bookingtab/confirmation.jsx

import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../../components/Header';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';

const db = getFirestore(app);

const Confirmation = () => {
  const router = useRouter();
  const { mechanic, service, paymentMethod, date, time } = useLocalSearchParams();
  const mechanicDetails = JSON.parse(mechanic);

  const handleConfirm = async () => {
    try {
      await addDoc(collection(db, 'bookings'), {
        mechanic: mechanicDetails,
        service,
        paymentMethod,
        date,
        time,
        createdAt: new Date(),
      });
      Alert.alert('Booking Confirmed', 'Your booking has been successfully confirmed.', [
        {
          text: 'OK',
          onPress: () => router.replace('/bookingtab'),
        },
      ]);
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'There was an issue confirming your booking.');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <ScrollView className="mt-[20vh]">
          <View className="max-w-[80vh] min-h-[80vh] py-2 px-4">
            <Text className="text-2xl text-white font-bold mb-4">Confirm Your Booking</Text>
            <View className="mb-4">
              <Text className="text-lg text-white font-bold">Mechanic:</Text>
              <Text className="text-md text-white">{mechanicDetails.name}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg text-white font-bold">Service Selected:</Text>
              <Text className="text-md text-white">{service}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg text-white font-bold">Payment Method:</Text>
              <Text className="text-md text-white">{paymentMethod}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg text-white font-bold">Date:</Text>
              <Text className="text-md text-white">{date}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg text-white font-bold">Time:</Text>
              <Text className="text-md text-white">{time}</Text>
            </View>
            <TouchableOpacity
              className="bg-tertiary p-2 rounded"
              onPress={handleConfirm}
            >
              <Text className="text-white text-center">Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Confirmation;