// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "_",
  authDomain: "_",
  projectId: "_",
  storageBucket: "_",
  messagingSenderId: "_",
  appId: "_",
  measurementId: "_"
};

// Initialize Firebase
<<<<<<< HEAD
const app = initializeApp(firebaseConfig);
=======
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
>>>>>>> a998ff6 (Fix authentication and routing - app now working)
