import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const SignUpButton = ({ title, handlePress, containerStyles, isLoading, disabled }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${disabled || isLoading ? 'opacity-50' : ''}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-pbold text-lg">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SignUpButton;
