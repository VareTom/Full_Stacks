// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:3101/',
  firebase: {
    apiKey: "AIzaSyCdxZRKDctJQ_7K1IAxVTW7crih5miWdXo",
    authDomain: "full-stacks.firebaseapp.com",
    projectId: "full-stacks",
    storageBucket: "full-stacks.appspot.com",
    messagingSenderId: "343280556655",
    appId: "1:343280556655:web:f06369c8b1ab6eb2650b9a",
    measurementId: "G-40DCN5EL38"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
