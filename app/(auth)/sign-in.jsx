// app/pages/sign-in.jsx
import React, { useState, useEffect } from 'react';
import { Image, View, Text, ScrollView, Alert, Modal, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth as firebaseAuth } from '../../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';

// Allow WebBrowser redirects
WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(firebaseAuth, resetEmail);
      Alert.alert('Success', 'Password reset email sent.');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (initializing) return null;

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
            <Pressable onPress={() => setModalVisible(true)}>
              <Text className="text-lg font-psemibold text-secondary">
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <CustomButton
            title="Log In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an Account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign-Up
            </Link>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className="text-lg font-bold mb-4">Reset Password</Text>
            <TextInput
              placeholder="Enter your email"
              value={resetEmail}
              onChangeText={setResetEmail}
              className="border border-gray-300 rounded p-2 mb-4"
              keyboardType="email-address"
            />
            <View className="flex-row justify-end">
              <Pressable
                className="mr-4"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-blue-500">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handlePasswordReset}
              >
                <Text className="text-red-500">Reset</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignIn;
