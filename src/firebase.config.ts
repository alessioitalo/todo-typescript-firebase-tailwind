import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBT2h2uehAyL-Y1qY8FlpLrFrFw5nnVe3k',
  authDomain: 'todo-ts-bae9a.firebaseapp.com',
  projectId: 'todo-ts-bae9a',
  storageBucket: 'todo-ts-bae9a.appspot.com',
  messagingSenderId: '530845751993',
  appId: '1:530845751993:web:1dfdb371b7b405ec5c9968',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = getFirestore(app);
