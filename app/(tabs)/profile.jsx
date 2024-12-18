// app/tabs/profile.jsx
import React, { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { images } from '../../constants';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Optional: Reload the user to get the latest data
        await currentUser.reload();
        const updatedUser = auth.currentUser;
        setUser({
          email: updatedUser.email,
          photoURL: updatedUser.photoURL,
          displayName: updatedUser.displayName,
        });
        console.log('User Data:', {
          email: updatedUser.email,
          photoURL: updatedUser.photoURL,
          displayName: updatedUser.displayName,
        });
      } else {
        setUser(null);
        router.replace('/sign-in');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="relative flex-1">
        <Header />
        <ScrollView contentContainerStyle={{ paddingTop: 200, paddingHorizontal: 40 }}>
          <View className="mb-6 flex-row items-center justify-evenly">
            <Image
              source={images.profile} // Ensure this path is correct
              className="w-24 h-24 rounded-full mb-4"
              resizeMode="cover"
            />
            <View className="flex-col">
              <Text className="text-lg text-white font-pextrabold">{user?.displayName || 'Loading...'}</Text>
              <Text className="text-md text-white font-psemibold">{user?.email || ' '}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/bookingtab/bookings')} className="bg-blue-500 py-2 px-4 rounded-full mt-4">
            <Text className="text-white text-center">View Bookings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;