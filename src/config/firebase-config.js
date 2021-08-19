const firebase = require("firebase");

const firebaseConfig = firebase.initializeApp( {
  apiKey: "AIzaSyACrRwLYf6Ailc98BeHEGRsYibcbJL2SIw",
  authDomain: "delivery-gmais.firebaseapp.com",
  databaseURL: "https://delivery-gmais-default-rtdb.firebaseio.com",
  projectId: "delivery-gmais",
  storageBucket: "delivery-gmais.appspot.com",
  messagingSenderId: "313144121971",
  appId: "1:313144121971:web:b97f9b1e73e3647f832806",
  measurementId: "G-5R4CKL3BKN",
  });

 module.exports = firebaseConfig;
