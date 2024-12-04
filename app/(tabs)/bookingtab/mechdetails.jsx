// app/pages/mechdetails.jsx
import React, { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MechDetails = () => {
  const router = useRouter();
  const { mechanic } = useLocalSearchParams();
  let mechanicDetails = {};

  try {
    mechanicDetails = JSON.parse(mechanic);
  } catch (error) {
    console.error('Failed to parse mechanic details:', error);
    return null; // Prevent the component from rendering with invalid data
  }

  const [reviews, setReviews] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchReviews = async () => {
        try {
          const storedReviews = await AsyncStorage.getItem(`reviews_${mechanicDetails.id}`);
          if (isActive) {
            setReviews(storedReviews ? JSON.parse(storedReviews) : []);
          }
        } catch (error) {
          console.error('Failed to load reviews:', error);
        }
      };

      fetchReviews();

      return () => {
        isActive = false;
      };
    }, [mechanicDetails.id])
  );

  const handleAddReview = () => {
    router.push({
      pathname: '/bookingtab/mechreview',
      params: {
        mechanic: JSON.stringify(mechanicDetails),
      },
    });
  };

  const handleBookNow = () => {
    router.push({
      pathname: '/bookingtab/transaction',
      params: { mechanic: JSON.stringify(mechanicDetails) },
    });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <ScrollView className="mt-[20vh]">
          <View className="max-w-[80vh] min-h-[80vh] py-2 px-4">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text className="text-lg text-white font-bold">{mechanicDetails.name}</Text>
                <Text className="text-md text-white">{mechanicDetails.specialty}</Text>
              </View>
              <TouchableOpacity className="bg-tertiary p-2 rounded" onPress={handleBookNow}>
                <Text className="text-white">Book Now</Text>
              </TouchableOpacity>
            </View>
            <View className="mb-4">
              <Text className="text-lg text-white font-bold">Services Offered</Text>
              <Text className="text-md text-white">- Change Oil</Text>
              <Text className="text-md text-white">- Tire Replacement</Text>
              <Text className="text-md text-white">- Tire Vulcanizing</Text>
              <Text className="text-md text-white">- Engine Maintenance and Overhaul</Text>
            </View>
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg text-white font-bold">Reviews</Text>
                <TouchableOpacity className="bg-tertiary p-2 rounded" onPress={handleAddReview}>
                  <Text className="text-white">Add Review</Text>
                </TouchableOpacity>
              </View>
              <View className="bg-gray-200 rounded-lg p-4 mb-4">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <View key={index} className="mb-2">
                      <Text className="text-md text-gray-800">Rating: {review.rating} Stars</Text>
                      <Text className="text-md text-gray-800">{review.comment}</Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-md text-gray-800">No reviews yet.</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MechDetails;