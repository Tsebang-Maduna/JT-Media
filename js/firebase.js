import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKV-gmpvJXAW85v-An9apgWfDW03NZYJw",
  authDomain: "jt-media-36b64.firebaseapp.com",
  projectId: "jt-media-36b64",
  storageBucket: "jt-media-36b64.firebasestorage.app",
  messagingSenderId: "975938520365",
  appId: "1:975938520365:web:fcfe9f2f5251c45fd83fa4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };