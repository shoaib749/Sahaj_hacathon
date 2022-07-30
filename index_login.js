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
//for firebase
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"
const db = getDatabase();

//init for login page
const L_username  = document.getElementById("userNameInput");
const L_password =  document.getElementById("passwordInput");
const L_submit =    document.getElementById("loginButton");

L_submit.addEventListener('click',authUser);
function authUser(){
     const dbRef = ref(db);
     // if(isEmptyOrSpace(L_username.value)||isEmptyOrSpace(L_password.value)){
     //     alert("Enter username and Password");
     //     return;
     // }
     get(child(dbRef, "PatientList/" + L_username.value))
         .then((snapshot) => {
             if (snapshot.exists()) {
                 let dbpass = decPass(snapshot.val().password);
                 // console.log(snapshot.val().password+"from snapshot");
                 console.log(dbpass+" from database");
                 // console.log(L_password.value);
                 if(dbpass == L_password.value){
                     login(snapshot.val());
                 }
                 else{
                     alert("Incorrect password or username")    
                 }
             } else {
                 alert("User does not exits!!")
             }
         });
 }
 function login(user){
     sessionStorage.setItem('user',JSON.stringify(user));
     window.location="details.html";
 }
 
 function decPass(pass){
     var pass12 = CryptoJS.AES.decrypt(pass,L_password.value);
     return pass12.toString(CryptoJS.enc.Utf8);
 }