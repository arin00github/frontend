// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHAFcqPWYp57x3WvFYvXa54pnjElmABoY",
    authDomain: "react-firebase-chat-app-d3927.firebaseapp.com",
    databaseURL: "https://react-firebase-chat-app-d3927-default-rtdb.firebaseio.com",
    projectId: "react-firebase-chat-app-d3927",
    storageBucket: "react-firebase-chat-app-d3927.appspot.com",
    messagingSenderId: "855420554659",
    appId: "1:855420554659:web:77e4c9ea360b94f3655e16",
    measurementId: "G-09BX5X5BH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
