// app/bookingtab/transaction.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../../components/Header';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Transaction = () => {
  const router = useRouter();
  const { mechanic } = useLocalSearchParams();
  const mechanicDetails = JSON.parse(mechanic);

  const [selectedService, setSelectedService] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const services = [
    'Change Oil',
    'Tire Replacement',
    'Tire Vulcanizing',
    'Engine Maintenance and Overhaul',
  ];

  const paymentMethods = ['Cash after service', 'GCash', 'Maya'];

  const handleProceed = () => {
    router.push({
      pathname: '/bookingtab/confirmation',
      params: {
        mechanic: JSON.stringify(mechanicDetails),
        service: selectedService,
        paymentMethod: selectedPaymentMethod,
        date: selectedDate.toDateString(),
        time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    });
  };

  const onChangeDate = (event, selectedDateValue) => {
    if (selectedDateValue) {
      setSelectedDate(selectedDateValue);
    }
    setShowDatePicker(false);
  };

  const onChangeTime = (event, selectedTimeValue) => {
    if (selectedTimeValue) {
      setSelectedTime(selectedTimeValue);
    }
    setShowTimePicker(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative h-full">
        <Header />
        <View className="mt-[20vh]">
          <View className="max-w-[80vh] min-h-[80vh] py-2 px-4">
            {/* Mechanic Details */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text className="text-lg text-white font-bold">{mechanicDetails.name}</Text>
                <Text className="text-md text-white">{mechanicDetails.specialty}</Text>
              </View>
            </View>
            {/* Service Selection */}
            <View className="mb-4">
              <Text className="text-lg text-white font-bold mb-2">Select Service</Text>
              <View className="bg-gray-200 rounded-lg">
                <Picker
                  selectedValue={selectedService}
                  onValueChange={(itemValue) => setSelectedService(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="Select a service..." value="" />
                  {services.map((service, index) => (
                    <Picker.Item key={index} label={service} value={service} />
                  ))}
                </Picker>
              </View>
            </View>
            {/* Payment Method */}
            <View className="mb-4">
              <Text className="text-lg text-white font-bold mb-2">Payment Method</Text>
              <View className="bg-gray-200 rounded-lg">
                <Picker
                  selectedValue={selectedPaymentMethod}
                  onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="Select payment method..." value="" />
                  {paymentMethods.map((method, index) => (
                    <Picker.Item key={index} label={method} value={method} />
                  ))}
                </Picker>
              </View>
            </View>
            {/* Date Picker */}
            <View className="mb-4">
              <Text className="text-lg text-white font-bold mb-2">Select Date</Text>
              <TouchableOpacity
                className="bg-gray-200 p-3 rounded-lg"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className="text-md text-black">{selectedDate.toDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                  minimumDate={new Date()}
                />
              )}
            </View>
            {/* Time Picker */}
            <View className="mb-4">
              <Text className="text-lg text-white font-bold mb-2">Select Time</Text>
              <TouchableOpacity
                className="bg-gray-200 p-3 rounded-lg"
                onPress={() => setShowTimePicker(true)}
              >
                <Text className="text-md text-black">
                  {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="default"
                  onChange={onChangeTime}
                  is24Hour={false}
                />
              )}
            </View>
            {/* Proceed Button */}
            <TouchableOpacity
              className="bg-tertiary p-2 rounded"
              onPress={handleProceed}
              disabled={
                !selectedService ||
                !selectedPaymentMethod ||
                !selectedDate ||
                !selectedTime
              }
            >
              <Text className="text-white text-center">Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;