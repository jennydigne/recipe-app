import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAssKZPve52yPM4bNfXjziehKcnf-kdBsw",
  authDomain: "recipe-app-7e38d.firebaseapp.com",
  projectId: "recipe-app-7e38d",
  storageBucket: "recipe-app-7e38d.firebasestorage.app",
  messagingSenderId: "760543491074",
  appId: "1:760543491074:web:6ce0e36a0cd529fa3fa31b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
