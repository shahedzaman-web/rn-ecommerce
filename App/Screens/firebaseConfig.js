
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD1egTYT17sB5QjOaf5lU7QxcWCoOH0Ul0",
  authDomain: "sz-rn-e-commerce-45ecf.firebaseapp.com",
  projectId: "sz-rn-e-commerce-45ecf",
  storageBucket: "sz-rn-e-commerce-45ecf.appspot.com",
  messagingSenderId: "935052371395",
  appId: "1:935052371395:web:35a49dc74b9c255123c976"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };