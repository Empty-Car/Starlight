import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI9VG2bfcBK3TsHlQtENuKRO-M_VbLEC8",
  authDomain: "empty-car-a02ed.firebaseapp.com",
  projectId: "empty-car-a02ed",
  storageBucket: "empty-car-a02ed.appspot.com",
  messagingSenderId: "937343504187",
  appId: "1:937343504187:web:357e1ac140e9a738beb11e",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
