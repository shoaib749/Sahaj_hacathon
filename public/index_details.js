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
//buttons for choosing 
const B_select = document.getElementById("selectButton");
const DocName = document.getElementById("fileName");

B_select.onclick = function () {
     input.click();
}
submit.onclick = function () {
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
function generate() {
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
                         displayDocuments(downloadURL);
                    });
          });

}

function displayDocuments(url){
     var uploadedDocHolder = document.getElementById('uploadedDocuments');
     var embed = document.createElement('embed');
     embed.src = url;
     uploadedDocHolder.appendChild(embed);
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
          Email: D_email,
          DOB: D_dob,
          Addhar: D_adhar,
          Bloodgroup: D_bloodgroup,
          GuardianEmail: D_guardianEmail,
          GuardianPhone: D_guardianPhone,
          guardianName: D_guardianName,
          PhoneNo: D_phoneNo,
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
var proPicInput = document.createElement('input');
proPicInput.type = 'file';
proPicInput.addEventListener('change', (e) => {
     pic = e.target.pic;
     reader.readAsDataURL(pic[0]);
     //     var extension = GetFileExt(files[0]);
     //     var name = GetFileName(files[0]);
     //     namebox.value = name;
     //     ext.innerHTML = extension;
})


reader.onload = function () {
     imgProfile.src = reader.result;
}
B_selct_profile.onclick = function () {
     proPicInput.click();
}

