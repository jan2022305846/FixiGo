import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import Header from '../../../components/Header';

const db = getFirestore(app);

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    };

    fetchBookings();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, updatedData);
      Alert.alert('Booking Updated', 'Your booking has been successfully updated.');
      // Refresh bookings
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
      setEditingBookingId(null);
      setUpdatedData({});
    } catch (error) {
      console.error('Error updating booking: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      Alert.alert('Booking Deleted', 'Your booking has been successfully deleted.');
      // Refresh bookings
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error deleting booking: ', error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header title="Bookings" />
        <ScrollView className="mt-[20vh]">
          <View className="max-w-[80vh] px-4 py-4">
            {bookings.map((booking) => (
              <View key={booking.id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
                {editingBookingId === booking.id ? (
                  <>
                    <TextInput
                      className="text-md"
                      placeholder="Service"
                      value={updatedData.service || booking.service}
                      onChangeText={(text) => setUpdatedData({ ...updatedData, service: text })}
                    />
                    <TextInput
                      className="text-md"
                      placeholder="Payment Method"
                      value={updatedData.paymentMethod || booking.paymentMethod}
                      onChangeText={(text) => setUpdatedData({ ...updatedData, paymentMethod: text })}
                    />
                    <TextInput
                      className="text-md"
                      placeholder="Date"
                      value={updatedData.date || booking.date}
                      onChangeText={(text) => setUpdatedData({ ...updatedData, date: text })}
                    />
                    <TextInput
                      className="text-md"
                      placeholder="Time"
                      value={updatedData.time || booking.time}
                      onChangeText={(text) => setUpdatedData({ ...updatedData, time: text })}
                    />
                    <TouchableOpacity onPress={() => handleUpdate(booking.id)}>
                      <Text className="text-blue-500">Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEditingBookingId(null)}>
                      <Text className="text-red-500">Cancel</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text className="text-lg font-bold">Mechanic: {booking.mechanic.name}</Text>
                    <Text className="text-md">Service: {booking.service}</Text>
                    <Text className="text-md">Payment Method: {booking.paymentMethod}</Text>
                    <Text className="text-md">Date: {booking.date}</Text>
                    <Text className="text-md">Time: {booking.time}</Text>
                    <View className="flex-row justify-between mt-4">
                      <TouchableOpacity onPress={() => { setEditingBookingId(booking.id); setUpdatedData(booking); }}>
                        <Text className="text-blue-500">Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(booking.id)}>
                        <Text className="text-red-500">Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Bookings;