// app/tabs/booking.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const BookingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold">Book a Mechanic</Text>
      <Text className="mt-4">Select your preferred date and time.</Text>
      <Button title="Confirm Booking" onPress={() => { /* Booking Logic */ }} />
    </View>
  );
};

export default BookingScreen;
