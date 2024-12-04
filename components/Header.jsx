import React from 'react';
import { View, Image } from 'react-native';
import { images } from '../constants'; // Adjust the import path as necessary

const Header = () => {
  return (
    <View className="absolute top-0 left-0 right-0 z-10 bg-primary">
      <View className="max-w-[80vh] justify-center min-h-[20vh] px-4 py-4">
        <Image source={images.logo} className="w-[95px] h-[95px] ml-0 my-auto" />
      </View>
    </View>
  );
};

export default Header;