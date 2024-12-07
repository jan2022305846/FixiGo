// app/pages/sign-in.jsx
import React, { useState, useEffect } from 'react';
import { Image, View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
// Allow WebBrowser redirects
WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Google Sign-In
  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '610275641442-56e1oiil8oi2o0cl9a5uqbo6t7gduv0b.apps.googleusercontent.com',
    webClientId: '1:610275641442:web:4c502ae667cfeb6c2be93b',
    scopes: ['profile', 'email'],
  });

  // Facebook Sign-In
  const [, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '1088305459695773',
    scopes: ['public_profile', 'email'],
  });

  // Handle Google Sign-In Response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const credential = GoogleAuthProvider.credential(authentication.idToken);
      signInWithCredential(auth, credential)
        .then(() => router.push('/home'))
        .catch((error) => Alert.alert('Error', error.message));
    }
  }, [response]);

  // Handle Facebook Sign-In Response
  useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { authentication } = fbResponse;
      const credential = FacebookAuthProvider.credential(authentication.accessToken);
      signInWithCredential(auth, credential)
        .then(() => router.push('/home'))
        .catch((error) => Alert.alert('Error', error.message));
    }
  }, [fbResponse]);

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
            Log In
          </Text>
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

          <View className="justify-center items-center mt-2">
            <Link href="/reset" className="text-lg font-psemibold text-secondary">
              Forgot Password?
            </Link>
          </View>

          <CustomButton
            title="Log In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white justify-center font-psemibold">-------OR--------</Text>
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Continue with</Text>
          </View>

          <View className="justify-center pt-5 flex-row gap-10">
            <TouchableOpacity onPress={() => promptAsync()}>
              <Image source={icons.google} className="w-12 h-12" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => fbPromptAsync()}>
              <Image source={icons.facebook} className="w-12 h-12" />
            </TouchableOpacity>
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an Account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign-Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;