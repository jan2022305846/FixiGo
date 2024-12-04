// app/tabs/booking.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import MechList from '../../(pages)/mechlist';

const BookingScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <ScrollView className="mt-[20vh]">
          <View className="max-w-[80vh] px-4 py-4">
            <MechList />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;
