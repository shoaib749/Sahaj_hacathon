//import statements for firebase 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";

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

//init for login page
const L_username  = document.getElementById("userNameInput");
const L_password =  document.getElementById("passwordInput");
const L_submit =    document.getElementById("loginButton");
//init for signup page
const S_fullName = document.getElementById("name");
const S_username  = document.getElementById("phnoInput");
const S_password =  document.getElementById("signupPassword");
const S_submit =    document.getElementById("signUpButton");
const S_confirmPassword =  document.getElementById("confirmPasswordInput");

import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"

import {} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();





//functions for signUppage
function registerUser() {

     // if (!Validation()) {
     //     return;
     // }
     const dbRef = ref(db);
     get(child(dbRef, "StudentLogin/" + S_username.value))
         .then((snapshot) => {
             if (snapshot.exists()) {
                 alert("User already exits");
             } else {
                 set(ref(db, "StudentLogin/"+S_username.value),
                     {
                         Name: S_fullName.value,
                         Username : S_username.value,
                         password: S_password
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
 function Validation() {
     let nameregex = /^[a-zA-Z\s]+$/;
     let emailregex = /^[a-zA-Z0-9]+@$/;
     let userregex = /^[a-zA-Z0-9]{5,}$/;
 
     if (isEmptyOrSpace(S_fullName.value) || isEmptyOrSpace(S_password.value) || isEmptyOrSpace(S_email.value) || isEmptyOrSpace(S_username.value)) {
         alert("Enter value");
         return false;
     }
     if (!nameregex.test(S_fullName.value)) {
         alert("The Name should only contain alphabets!");
         return false
     }
 
     // if (!emailregex.test(email.value)) {
     //     alert("Enter a valid emailId");
     //     return false;
     // }
     if (!userregex.test(S_username.value)) {
         alert("Enter a valid username");
         return false;
     }
     return true;
 }
 





//functions for login page
function authUser() {
     const dbRef = ref(db);
     if (isEmptyOrSpace(L_username.value) || isEmptyOrSpace(L_password.value)) {
         alert("Enter username and Password");
         return;
     }
     get(child(dbRef, "StudentLogin/" + L_username.value))
         .then((snapshot) => {
             if (snapshot.exists()) {
                 let dbpass = decPass(snapshot.val().password);
                 // console.log(snapshot.val().password+"from snapshot");
                 console.log(dbpass + " from database");
                 // console.log(L_password.value);
                 if (dbpass == L_password.value) {
                     login(snapshot.val());
                 }
                 else {
                     alert("Incorrect password or username")
                 }
             } else {
                 alert("User does not exits!!")
             }
         });
 }
 function login(user) {
     sessionStorage.setItem('user', JSON.stringify(user));
     window.location = "home.html";
 }
 //functions for login & sign up
 function encPass() {
     var pass12 = CryptoJS.AES.encrypt(S_password.value, S_password.value);
     return pass12.toString();
 }
 function decPass(pass) {
     var pass12 = CryptoJS.AES.decrypt(pass, L_password.value);
     return pass12.toString(CryptoJS.enc.Utf8);
 }
 function isEmptyOrSpace(str) {
     return str == null || str.match(/^ *$/) !== null;
 }

 //assining values to buttons 
 
 
let current = window.location.href.toString();
console.log(window.location.href.toString());
if (current.match("index")) {
     L_submit.addEventListener('click', authUser);
 } else if (current.match("signup")) {
     S_submit.addEventListener('click', registerUser);
 }
 
 