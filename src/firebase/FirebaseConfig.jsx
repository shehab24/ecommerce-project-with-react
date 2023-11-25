import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDGozgB81iAWRqO81pZ-XtT385dHEGdFp8",
  authDomain: "react-ecommerce-717ba.firebaseapp.com",
  projectId: "react-ecommerce-717ba",
  storageBucket: "react-ecommerce-717ba.appspot.com",
  messagingSenderId: "933610506295",
  appId: "1:933610506295:web:7754aeb48ee10dc49f57b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;