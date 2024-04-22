import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAesQpJHrlGv2t2UsA0FLICgUBxwQ1624w",
  authDomain: "fir-lesson-ece5e.firebaseapp.com",
  projectId: "fir-lesson-ece5e",
  storageBucket: "fir-lesson-ece5e.appspot.com",
  messagingSenderId: "614405558291",
  appId: "1:614405558291:web:1118831fb3e190d8adafe6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);