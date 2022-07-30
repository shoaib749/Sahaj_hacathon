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

const name = document.getElementById("name");
const gender = document.getElementById("gender");
const dob = document.getElementById("dob");
const phone = document.getElementById("phno");
const email = document.getElementById("email");
const adhar = document.getElementById("aadhar");
const bloodgroup = document.getElementById("bloodGroupInput");
const guardianName = document.getElementById("gName");
const guardianPhone = document.getElementById("gPhno");
const guardianEmail = document.getElementById("gEmail");
const submit = document.getElementById("save");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//firebase 
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"
const db = getDatabase();
//storage
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";

const dbRef = ref(db);
get(child(dbRef,"PatientData/" + localStorage.getItem("username"))
.then((snapshot)=>{
     if(snapshot.exists()){
          snapshot.val().Addhar;
          
     }
}))
