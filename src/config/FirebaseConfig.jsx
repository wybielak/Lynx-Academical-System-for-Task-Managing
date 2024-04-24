import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyClYqOEPWtzA7W12O9UjxlpgCjg-nCd2D4",
  authDomain: "pzeclon.firebaseapp.com",
  projectId: "pzeclon",
  storageBucket: "pzeclon.appspot.com",
  messagingSenderId: "350480828015",
  appId: "1:350480828015:web:ded0e2500bd269806d6f9a",
  measurementId: "G-5YG4TFRY5H"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app)
//export const storage = getStorage(app)
//const analytics = getAnalytics(app);