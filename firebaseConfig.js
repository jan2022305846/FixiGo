import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage for persistence

const firebaseConfig = {
  apiKey: "AIzaSyAu0X1qcVEFzqpOVrjI4rFaEj0pi1dWjKw",
  authDomain: "fixigo-2e986.firebaseapp.com",
  projectId: "fixigo-2e986",
  storageBucket: "fixigo-2e986.firebasestorage.app",
  messagingSenderId: "610275641442",
  appId: "1:610275641442:web:4c502ae667cfeb6c2be93b",
  measurementId: "G-PL5LNVR9GW"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Enable persistence
});

export { auth };  // Export auth object for use in your app
