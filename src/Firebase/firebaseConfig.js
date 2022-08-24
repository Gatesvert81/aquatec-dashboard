// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC_OdyhKyx4WKm4uxBQv7NPM9uKZY6a-Hc",
    authDomain: "aquatec-c936c.firebaseapp.com",
    projectId: "aquatec-c936c",
    storageBucket: "aquatec-c936c.appspot.com",
    messagingSenderId: "1015136750462",
    appId: "1:1015136750462:web:0a1ecbd00474e736c8412f"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyC_OdyhKyx4WKm4uxBQv7NPM9uKZY6a-Hc",
//     appId: process.env.FIREBASE_APP_ID,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }