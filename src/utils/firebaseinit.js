// FIREBASE METHODS
// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase} from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const PREFIX = process.env.NODE_ENV === "production" ? "REACT_APP_PROD" : "REACT_APP_TESTING";

if (process.env.NODE_ENV !== "production") {
  console.log(process.env[`${PREFIX}_PROJECT_ID`]);
}

const config = {
  apiKey: process.env[`${PREFIX}_FIREBASE_API_KEY`],
  authDomain: process.env[`${PREFIX}_FIREBASE_AUTH_DOMAIN`],
  databaseURL: process.env[`${PREFIX}_DATABASE_URL`],
  storageBucket: process.env[`${PREFIX}_STORAGE_BUCKET`],
  messagingSenderId: process.env[`${PREFIX}_MESSAGING_SENDER_ID`],
  projectId: process.env[`${PREFIX}_PROJECT_ID`],
};

const app = initializeApp(config);
export const firebasedb = getDatabase(app);
export const firestore = getFirestore(app);
export const getCollection = async (collectionName) => {
  const col = collection(firestore, collectionName);
  const snapshot = await getDocs(col);
  return snapshot;
}
export default app;