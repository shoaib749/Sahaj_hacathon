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

const name = document.getElementById("patientName2");
const gender = document.getElementById("patientGender2");
const dob = document.getElementById("patientDOB2");
const phone = document.getElementById("patientPhone2");
const email = document.getElementById("patientEmalid2");
const adhar = document.getElementById("patientAdhar2");
const bloodgroup = document.getElementById("bloodGroupInput");
const guardianName = document.getElementById("patientGuardianName2");
const guardianPhone = document.getElementById("guardianPhone2");
const guardianEmail = document.getElementById("guardianEmail2");
const QR = document.getElementById("qrId");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//firebase 
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js"
const db = getDatabase();
//storage
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";

const dbRef = ref(db);
get(child(dbRef, "PatientData/" + localStorage.getItem("username")))
         .then((snapshot) => {
               if (snapshot.exists()) {
                   adhar.innerHTML = snapshot.val().Addhar;
                   console.log(snapshot.val().Addhar);
                   email.innerHTML = snapshot.val().Email;
               //     bloodgroup.innerHTML = snapshot.val().Bloodgroup;
                   dob.innerHTML = snapshot.val().DOB;
                   name.innerHTML = snapshot.val().Name;
                   phone.innerHTML = snapshot.val().PhoneNo;
                   guardianName.innerHTML = snapshot.val().guardianName;
                   guardianEmail.innerHTML = snapshot.val().GuardianEmail;
                   guardianPhone.innerHTML = snapshot.val().GuardianPhone;
                   QR.src= snapshot.val().QRlink; 
               }else{
                    alert("Error");
               }
         });

QR.onclick = function (){
     downloadImage(QR.src);
}
async function downloadImage(imageSrc) {
     const image = await fetch(imageSrc)
     const imageBlog = await image.blob()
     const imageURL = URL.createObjectURL(imageBlog)
   
     const link = document.createElement('a')
     link.href = imageURL
     link.download = localStorage.getItem("username");
     document.body.appendChild(link)
     link.click()
     document.body.removeChild(link)
   }