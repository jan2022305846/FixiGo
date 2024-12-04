// app/(tabs)/bookingtab/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';

const BookingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mechdetails" options={{ headerShown: false }} />
      <Stack.Screen name="transaction" options={{ headerShown: false }} />
      <Stack.Screen name="confirmation" options={{ headerShown: false }} />
      <Stack.Screen name="mechreview" options={{ headerShown: false }} />
    </Stack>
  );
};

export default BookingLayout;