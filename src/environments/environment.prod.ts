import { initializeApp } from 'firebase/app';
export const environment = {
  firebase: {
    projectId: 'menuapp-8323f',
    appId: '1:157701965026:web:66fdfb0534ff7ba4524abb',
    storageBucket: 'menuapp-8323f.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBLGPu59OkWUOPUdL5TVc_rzCgR03B3-u4',
    authDomain: 'menuapp-8323f.firebaseapp.com',
    messagingSenderId: '157701965026',
    measurementId: 'G-MYXT8SMWHX',
  },
  production: true
};

export const app = initializeApp(environment.firebase);