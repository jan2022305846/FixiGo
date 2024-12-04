// app/pages/mechlist.jsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { MechanicContext } from '../(context)/MechanicContext';
import { useRouter } from 'expo-router';

const MechList = () => {
  const { mechanics } = useContext(MechanicContext);
  const router = useRouter();

  const handlePress = (mechanic) => {
    router.push({
      pathname: '/bookingtab/mechdetails',
      params: { mechanic: JSON.stringify(mechanic)},
    });
  }
  return (
    <View>
      {mechanics.length > 0 ? (
        mechanics.map((mechanic) => (
          <TouchableOpacity key={mechanic.id} onPress={() => handlePress(mechanic)}>
            <View className="bg-gray-200 rounded-lg p-4 mb-4">
              <Text className="text-lg text-gray-800 font-semibold">{mechanic.name}</Text>
              <Text className="text-md text-gray-600">{mechanic.specialty}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-center text-white font-psemibold">No mechanics added yet.</Text>
      )}
    </View>
  );
};

export default MechList;
