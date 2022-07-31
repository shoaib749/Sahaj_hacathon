// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";

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

//importing username
// import {username} from "./userSession.js";
// document.cookie=L_username;
// var session = document.cookie;
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
     if (!Validation()) {
        return;
    }
     get(child(dbRef, "PatientList/" + L_username.value))
         .then((snapshot) => {
             if (snapshot.exists()) {
                 let dbpass = decPass(snapshot.val().password);
                 // console.log(snapshot.val().password+"from snapshot");
                 console.log(dbpass+" from database");
                 // console.log(L_password.value);
                 if(dbpass == L_password.value){
                    // username = L_username.value;
                    localStorage.setItem("username",L_username.value );
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
     window.location="showUserDetails.html";
 }
 
 function decPass(pass){
     var pass12 = CryptoJS.AES.decrypt(pass,L_password.value);
     return pass12.toString(CryptoJS.enc.Utf8);
 }

 function Validation() {
    // let nameregex = /^[a-zA-Z\s]+$/;
    // let emailregex = /^[a-zA-Z0-9]+@$/;
    let userregex = /^[a-zA-Z0-9]{5,}$/;

    if (isEmptyOrSpace(L_username.value) || isEmptyOrSpace(L_password.value)) {
        alert("Enter Correct Username and Password ");
        return false;
    }
    else{
        return true;
    }
    // if (!nameregex.test(L_username.value)) {
    //     alert("The Name should only contain alphabets!");
    //     return false
    // }

    // if (!emailregex.test(email.value)) {
    //     alert("Enter a valid emailId");
    //     return false;
    // }
    // if (!userregex.test(L_username.val)) {
    //     alert("Enter a valid username");
    //     return false;
    // }
    return true;
}

function isEmptyOrSpace(str) {
    return str == null || str.match(/^ *$/) !== null;
}