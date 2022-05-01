// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false
};

export const app = initializeApp(environment.firebase);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
