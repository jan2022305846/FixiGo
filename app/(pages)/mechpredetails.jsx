// app/pages/mechpredetails.jsx
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MechanicContext } from '../(context)/MechanicContext';

const MechPreDetailsScreen = ({ mechanic, distance }) => {
  const { addMechanic } = useContext(MechanicContext);

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="p-4 bg-tertiary rounded-lg w-11/12 items-center">
        <View className="flex-row justify-between items-center w-full mb-2">
          <Text className="text-lg text-white font-bold">{mechanic.name}</Text>
          <Text className="text-sm text-white">Distance: {distance.toFixed(2)} meters</Text>
        </View>
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-base text-white">{mechanic.specialty}</Text>
          <Button
            title="Add Mechanic"
            onPress={() => {
              addMechanic(mechanic); // Add mechanic to context
              alert('Mechanic added to booking list!');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MechPreDetailsScreen;
