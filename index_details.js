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
//firebase 
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"
const db = getDatabase();


const name = document.getElementById("nameInput");
const gender = document.getElementById("");
const dob = document.getElementById("dobInput");
const phone = document.getElementById("phoneNoInput");
const email = document.getElementById("emailInput");
const adhar = document.getElementById("adharNoInput");
const bloodgroup = document.getElementById("bloodGroupInput");
const guardianName = document.getElementById("guardianNameInput");
const guardianPhone = document.getElementById("guardianPhoneInput");
const guardianEmail = document.getElementById("guardianEmailInput");
const submit = document.getElementById("save");
submit.addEventListener('click',generate);
function  test(){
     console.log(localStorage.getItem("username"));  
}
//genrating QR code 
function generate(){   
     var data =email.value;
     console.log(data);
     var url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
     // code.src = url;
     console.log(url);
     // console.log(code.src);
 }

//function for sending data to firebase 
function sendDataDB(){
     const dbRef = ref(db);
     get(child(dbRef,"PatientData"))
}


