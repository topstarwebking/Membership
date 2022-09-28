import * as firebase from 'firebase/app';
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo4G7oBHgzoowlwRawf8DPEt9jV_HnPrY",
  authDomain: "mymember-crm.firebaseapp.com",
  projectId: "mymember-crm",
  storageBucket: "mymember-crm.appspot.com",
  messagingSenderId: "491150015906",
  appId: "1:491150015906:web:29a44371c1a34cb78346fb",
  measurementId: "G-48EFQ4QXDN"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
