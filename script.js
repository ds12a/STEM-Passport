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


function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}