// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: "AIzaSyCyW2mK7zbaeQ6jIqzumE1no3h-pL6aBXs", 
  authDomain: "wad2test-43dc0.firebaseapp.com", 
  databaseURL: "https://wad2test-43dc0-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "wad2test-43dc0", 
  storageBucket: "wad2test-43dc0.appspot.com", 
  messagingSenderId: "581094929615", 
  appId: "1:581094929615:web:927fb1303429498d1033ba" 
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, signInWithPopup };