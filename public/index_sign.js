// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG5iICEez2P75v-hAWJb4wPBfB-CP15OI",
  authDomain: "dums-d3398.firebaseapp.com",
  databaseURL: "https://dums-d3398-default-rtdb.firebaseio.com",
  projectId: "dums-d3398",
  storageBucket: "dums-d3398.appspot.com",
  messagingSenderId: "977563357836",
  appId: "1:977563357836:web:bf8047ba5045f9fe99a1a9",
  measurementId: "G-SKFSHV7HP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"
const db = getDatabase();
//init for signup
const S_fullname = document.getElementById("nameInput");
const S_username  = document.getElementById("phnoInput");
const S_password =  document.getElementById("passwordInput");
const S_submit =    document.getElementById("signUpButton");
const S_confirmPassword =  document.getElementById("confirmPasswordInput");

S_submit.addEventListener('click',registerUser);
function registerUser() {
    
     // if(! Validation()){
     //  return;
     // }
      const dbRef = ref(db);
      get(child(dbRef, "PatientList/" +S_username.value))
          .then((snapshot) => {
              if (snapshot.exists()) {
                  alert("User already exits");
              } else {
                  set(ref(db, "PatientList/" + S_username.value),
                      {
                          Name: S_fullname.value,
                          username: S_username.value,
                          password: encPass()
                      })
                      .then(() => {
                          // fullname.value="";
                          // username.value="";
                          // email.value="";
                          // password,value="";
                          alert("User added successfully");
                      })
                      .catch((error) => {
                          alert("error" + error);
                      });
              }
          });
  }

  function encPass(){
     var pass12 = CryptoJS.AES.encrypt(S_password.value,S_password.value);
     return pass12.toString();
 }

