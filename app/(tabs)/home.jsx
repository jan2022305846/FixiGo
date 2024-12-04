import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import SearchSpinner from '../../components/SearchSpinner';
import { icons, images } from '../../constants';
import MechPreDetailsScreen from '../(pages)/mechpredetails';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [mechanics, setMechanics] = useState([
    { id: 1, name: 'Junior Motor Shop', specialty: 'MotorCycle Engine Repair', latitude: 8.364257324812064, longitude: 123.83926515226916 },
    { id: 2, name: 'SMC Motor Shop', specialty: 'MotorCycle Engine Repair', latitude: 8.351497575038007, longitude: 123.83786599134143 }
  ]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setIsMapVisible(true);
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [isLoading]);

  const handleLookForMechanic = () => {
    setIsLoading(true);
    setMechanics((prev) => [...prev]); // Force mechanics re-render
  };

  const handleMarkerPress = (mechanic) => {
    if (location?.coords) {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        mechanic.latitude,
        mechanic.longitude
      );
      setDistance(distance);
    }
    setSelectedMechanic(mechanic);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in metres
  };

  if (errorMsg) {
    Alert.alert('Error', errorMsg);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <ScrollView className="mt-[20vh]">
          <View className="max-w-[80vh] justify-center min-h-[45vh] px-4 py-2">
            {!isMapVisible || !location ? (
              <View className="flex-1 justify-center items-center">
                {isLoading ? <SearchSpinner /> : <Image source={images.empty} className="w-[95px] h-[95px]" />}
              </View>
            ) : (
              <View style={{ borderRadius: 40, overflow: 'hidden' }}>
                <MapView
                  style={{ width: '100%', height: 400 }}
                  region={
                    location
                      ? {
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02,
                        }
                      : undefined
                  }
                  showsUserLocation={true}
                  followsUserLocation={true}
                >
                  {mechanics.map((mechanic) => (
                    <Marker
                      key={mechanic.id}
                      coordinate={{ latitude: mechanic.latitude, longitude: mechanic.longitude }}
                      title={mechanic.name}
                      description={mechanic.specialty}
                      image={images.marker}
                      onPress={() => handleMarkerPress(mechanic)}
                    >
                      <Callout>
                        <View>
                          <Text>{mechanic.name}</Text>
                          <Text>{mechanic.specialty}</Text>
                        </View>
                      </Callout>
                    </Marker>
                  ))}
                </MapView>
              </View>
            )}
          </View>
          <View className="max-w-[80vh] justify-center min-h-[15vh] px-4">
            {selectedMechanic ? (
              <MechPreDetailsScreen mechanic={selectedMechanic} distance={distance} />
            ) : (
              <CustomButton
                title="Look for Mechanics"
                handlePress={handleLookForMechanic}
                containerStyles="mx-7"
                isLoading={isLoading}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
