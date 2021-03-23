// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2vaP7JxL7A1Su2TA2eh7qkj8EzhaAEco",
  authDomain: "stem-passport.firebaseapp.com",
  databaseURL: "https://stem-passport-default-rtdb.firebaseio.com",
  projectId: "stem-passport",
  storageBucket: "stem-passport.appspot.com",
  messagingSenderId: "11523935893",
  appId: "1:11523935893:web:8e41201db0258550b5d59c",
  measurementId: "G-WCXFVPR490"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics();
