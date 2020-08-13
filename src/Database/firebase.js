import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAomFIsrMKSIKf7Ya96GN2dIJQNzWO2-uQ",
        authDomain: "react-crud-two.firebaseapp.com",
        databaseURL: "https://react-crud-two.firebaseio.com",
        projectId: "react-crud-two",
        storageBucket: "react-crud-two.appspot.com",
        messagingSenderId: "198569879651",
        appId: "1:198569879651:web:fbac65495779842bdd7056",
        measurementId: "G-SW5SS65F0B"
    }
);

// Initialize Firebase
const firebaseDB = firebaseApp.firestore();
export default firebaseDB;