/*import { getAnalytics } from "firebase/analytics";*/
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase para la app web
const firebaseConfig = {
  apiKey: "AIzaSyBSDRHIkdA-_5oATrfOG5_mUao8DJ8GqjE",
  authDomain: "costeo360.firebaseapp.com",
  projectId: "costeo360",
  storageBucket: "costeo360.firebasestorage.app",
  messagingSenderId: "280209520071",
  appId: "1:280209520071:web:877879787b628ad64915e2",
  measurementId: "G-XE0XXSP8QH"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);


// Exporta los servicios que necesites
export const db = getFirestore(app);
export const auth = getAuth(app);
/*export const analytics = getAnalytics(app);*/