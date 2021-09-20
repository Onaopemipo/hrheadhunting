/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { initializeApp } from 'firebase/app';

export const environment = {
  production: false,

  // firebaseConfig: {
  //   apiKey: "AIzaSyDUrki6yW-SPqhnRuylTFD2xMeWmj2qJZs",
  //   authDomain: "headhunting-79281.firebaseapp.com",
  //   projectId: "headhunting-79281",
  //   storageBucket: "headhunting-79281.appspot.com",
  //   messagingSenderId: "455412192060",
  //   appId: "1:455412192060:web:efa0be69336479d1290439",
  //   measurementId: "G-13TV0F3EWP"
  // }
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

   firebaseConfig: {
    apiKey: "AIzaSyDUrki6yW-SPqhnRuylTFD2xMeWmj2qJZs",
    authDomain: "headhunting-79281.firebaseapp.com",
    projectId: "headhunting-79281",
    storageBucket: "headhunting-79281.appspot.com",
    messagingSenderId: "455412192060",
    appId: "1:455412192060:web:efa0be69336479d1290439",
    measurementId: "G-13TV0F3EWP"
  }

  // Initialize Firebase
  // const app = new initializeApp(firebaseConfig);

};

