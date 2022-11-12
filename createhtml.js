import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { 
    collection, 
    addDoc,
    getFirestore,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJRjoeDdLcjZHdiX-UyEfVWNXL8DqC1Dg",
  authDomain: "attendence-application-b96a9.firebaseapp.com",
  projectId: "attendence-application-b96a9",
  storageBucket: "attendence-application-b96a9.appspot.com",
  messagingSenderId: "427549592029",
  appId: "1:427549592029:web:58561fd33bd3876d6a8e34",
  measurementId: "G-2NK674B3P5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let studentSubmit = document.getElementById("studentSubmit");
let calssTiming = document.getElementById("calssTiming");
let teacherName = document.getElementById("teacherName");
let sectionName = document.getElementById("sectionName");
let courseName = document.getElementById("courseName");
let batchNumber = document.getElementById("batchNumber");
let monday = document.getElementById("monday");
let tuesday = document.getElementById("tuesday");
let wednesday = document.getElementById("wednesday");
let thursday = document.getElementById("thursday");
let friday = document.getElementById("friday");
let saturday = document.getElementById("saturday");
let sunday = document.getElementById("sunday");

studentSubmit.addEventListener("click", async() => {
    const docRef = await addDoc(collection(db, "craeteClass"), {
        classtiming: calssTiming.value,
        teachername: teacherName.value,
        sectionname: sectionName.value,
        coursename: courseName.value,
        batchnumber: batchNumber.value,
        mon: monday.checked,
        tue: tuesday.checked,
        wed: wednesday.checked,
        thur: thursday.checked,
        fri: friday.checked,
        sat: saturday.checked,
        sun: sunday.checked, 
      });
})
