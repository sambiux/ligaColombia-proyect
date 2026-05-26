import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDpA7ARoC52kuyWz-PxAnXKGDdCTadd89c",
  authDomain: "apiperros-3058a.firebaseapp.com",
  projectId: "apiperros-3058a",
  storageBucket: "apiperros-3058a.firebasestorage.app",
  messagingSenderId: "1089233649521",
  appId: "1:1089233649521:web:868207abd87258c0c580d0"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };