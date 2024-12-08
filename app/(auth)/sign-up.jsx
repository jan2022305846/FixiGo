// app/pages/sign-up.jsx
import React, { useState } from 'react';
import { Image, View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import SignUpButton from '../../components/SignUpButton';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';  // Import auth object
import CheckBox from 'expo-checkbox'; // Ensure you have this package installed

const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const submit = async () => {
    const { email, password, username } = form;
    if (!email || !password || !username) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: username });
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="max-w-[80vh] justify-center min-h-[80vh] px-4 pt-12 my-6">
          <Image source={images.logo} className="w-[95px] h-[95px]" />
          <Text className="text-2xl text-white text-semibold mt-5 font-psemibold">
            Sign Up
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry={true}
          />

          <View className="flex-row justify-center items-center mt-4">
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? '#fff' : undefined}
            />
            <Text className="text-white ml-2">
              I agree to the{' '}
              <Link href="/terms&con" className="text-blue-500">
                Terms of Service and Privacy Policy
              </Link>
            </Text>
          </View>

          <SignUpButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            disabled={!isChecked}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Log-in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;