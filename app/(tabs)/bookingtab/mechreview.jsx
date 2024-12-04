import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';

const MechReview = () => {
  const router = useRouter();
  const { mechanic } = useLocalSearchParams();
  const mechanicDetails = JSON.parse(mechanic);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmitReview = async () => {
    if (rating === 0 || comment.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and comment.');
      return;
    }

    try {
      const review = { rating, comment };
      const storedReviews = await AsyncStorage.getItem(`reviews_${mechanicDetails.id}`);
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      reviews.push(review);
      await AsyncStorage.setItem(`reviews_${mechanicDetails.id}`, JSON.stringify(reviews));
      Alert.alert('Thank you!', 'Your review has been submitted.', [
        {
          text: 'OK',
          onPress: () => router.replace('/bookingtab'),
        },
      ]);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <View className="mt-[20vh] max-w-[80vh] min-h-[80vh] py-2 px-4">
          <Text className="text-2xl text-white font-bold mb-4">Add Review</Text>
          {/* Rating Input */}
          <Text className="text-lg text-white font-bold mb-2">Your Rating:</Text>
          <View className="flex-row mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Text
                  className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Comment Input */}
          <Text className="text-lg text-white font-bold mb-2">Your Review:</Text>
          <TextInput
            className="bg-gray-200 rounded-lg p-4 mb-4 text-black"
            multiline
            numberOfLines={4}
            placeholder="Write your review here..."
            placeholderTextColor="gray"
            value={comment}
            onChangeText={setComment}
          />
          {/* Submit Button */}
          <TouchableOpacity className="bg-tertiary p-2 rounded" onPress={handleSubmitReview}>
            <Text className="text-white text-center">Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MechReview;