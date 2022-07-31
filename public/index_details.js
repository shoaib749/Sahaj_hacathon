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
//storage
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-storage.js";
var files = [];
var pic = [];
var reader = new FileReader();
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


//
const imgProfile = document.getElementById("proPicholder");
const B_selct_profile = document.getElementById("selPropic");
//buttons for chosing 
const B_select = document.getElementById("selectButton");
const DocName = document.getElementById("fileName");

B_select.onclick = function () {
     input.click();
}
submit.onclick = function () {
     //Check for Validations
     if(!Validation()){
          // alert("Accepted");
          console.log("Not Accepted");
          return;
     }
     UploadProcess();
     window.location = "showUserDetails.html";
}
var input = document.createElement('input');
input.type = 'file';
input.onchange = e => {
     files = e.target.files;
     var extension = GetFileExt(files[0]);
     var name = GetFileName(files[0]);
     DocName.innerHTML = name;

}

//genrating QR code 
function  generate() {
     var data = email.value;
     console.log(data);
     var url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
     console.log(url);
     return url.toString();
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

//testing for async upload function
async function UploadProcess() {
     var Doc = files[0];
     var Name = DocName.innerHTML;
     const metaData = {
          contentType: Doc.type
     }

     const storage = getStorage();
     const storageRef = sRef(storage, localStorage.getItem("username") + "/PatientDoc/" + Name);
     const UploadTask = uploadBytesResumable(storageRef, Doc, metaData);
     UploadTask.on('state-change', (snapshot) => {
          //     var progress_spinner = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //     progress.innerHTML = "Upload " + progress_spinner + "%";
     },
          (error) => {
               alert("Error in upload");
          },
          () => {
               getDownloadURL(UploadTask.snapshot.ref)
                    .then((downloadURL) => {
                         console.log(downloadURL);
                         saveUrlToDB(downloadURL);
                    });
          });
}
function saveUrlToDB(link) {
     var D_name = name.value;
    // var D_gender = gender.value;
     var D_dob = dob.value;
     var D_email = email.value;
     var D_adhar = adhar.value;
     var D_bloodgroup = bloodgroup.value;
     var D_guardianName = guardianName.value;
     var D_guardianPhone = guardianPhone.value;
     var D_guardianEmail = guardianEmail.value;
     var D_phoneNo = phone.value;

     set(ref(db, "PatientData/" + localStorage.getItem("username")), {
          Name: D_name,
         // Gender : D_gender,
          Email : D_email,
          DOB : D_dob,
          Addhar : D_adhar,
          Bloodgroup : D_bloodgroup,
          GuardianEmail : D_guardianEmail,
          GuardianPhone:D_guardianPhone,
          guardianName:D_guardianName,
          PhoneNo:D_phoneNo,
          QRlink: generate(),
          DocLink: link
     });
}


function GetFileExt(file) {
     var temp = file.name.split('.');
     var ext = temp.slice((temp.length - 1), (temp.length));
     return '.' + ext[0];
}
function GetFileName(file) {
     var temp = file.name.split('.');
     var fname = temp.slice(0, -1).join('.');
     console.log(fname);
     return fname;
}

//for profile picture
var input_2 = document.createElement('input');
input_2.type = 'file';
input_2.onchange = e => {
    pic = e.target.pic;
//     var extension = GetFileExt(files[0]);
//     var name = GetFileName(files[0]);
//     namebox.value = name;
//     ext.innerHTML = extension;
    reader.readAsDataURL(pic[0]);
    console.log(pic[0]);
}
reader.onload = function () {
//     imgProfile.setAttribute('src',reader.result);
      imgProfile.src = reader.result;
}
B_selct_profile.onclick = function(){
     input_2.click();
}

//Validations
function Validation() {
     let nameregex = /^[a-zA-Z\s]+$/;
     let emailregex = /^[a-zA-Z0-9]+@$/;
     // let userregex = /^[a-zA-Z0-9]{10,}$/;
     // let userregex = /^[0-9]{10}$/;
     let phoneregex=/^[0-9]{10}$/;
     let passregex = /^[a-zA-Z0-9]{5,}$/;
     let bloodregex=/^(A|B|AB|O)[+-]$/;
     let adharregex=/^[0-9]{12}$/;
     // let profileregex=/\.jpe?g$/i;
 
     // if (isEmptyOrSpace(name.value) || isEmptyOrSpace(dob.value) || 
     // isEmptyOrSpace(phone.value) || isEmptyOrSpace(email.value) || 
     // isEmptyOrSpace(adhar.value) || isEmptyOrSpace(bloodgroup.value) ||
     // isEmptyOrSpace(guardianName.value) || isEmptyOrSpace(guardianPhone.value) || 
     // isEmptyOrSpace(guardianEmail.value)) {
     //     alert("Enter all the details ");
     //     return false;
     // }

     if (!nameregex.test(name.value) && !nameregex.test(guardianName.value)&& name==guardianName) {
         alert("The Name should only contain alphabets!");
         return false
     }
     if (!phoneregex.test(phone.value) && !phoneregex.test(guardianPhone.value) && phone==guardianPhone) {
         alert("Enter the valid phone number");
         return false;
     }
 
     if (!emailregex.test(email.value) && !emailregex.test(guardianEmail.value)&& email==guardianEmail) {
         alert("Enter a valid email");
         return false;
     }
 
     if(!adharregex.test(adhar.value)){
         alert("Enter a valid adhar number");
         return false;
     }

     if(!bloodregex.test(bloodgroup.value)){
          alert("Enter a valid blood group");
          return false;
      }
      if(gender.value==null){
          alert("Select the gender");
          return false;
      }
     //validation for gender are remaining

     return true;
 }
 
 function isEmptyOrSpace(str) {
     return str == null || str.match(/^ *$/) !== null;
 }
 
 