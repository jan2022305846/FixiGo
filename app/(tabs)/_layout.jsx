import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { Tabs, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import MechanicProvider from '../(context)/MechanicContext';
import { icons } from '../../constants';

SplashScreen.preventAutoHideAsync();

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1 w-20">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-8 h-8 mt-10"
      />
      <Text
        className={`${focused ? 'font-semibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

const _layout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <MechanicProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#2CC2C2',
          tabBarInactiveTintColor: '#004AAD',
          tabBarStyle: {
            height: 80,
            backgroundColor: '#050A30',
            borderTopWidth: 0,
            paddingBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookingtab"
          options={{
            title: 'Book',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.bookmark} color={color} name="Book" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </MechanicProvider>
  );
};

export default _layout;