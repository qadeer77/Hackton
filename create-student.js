import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

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
const auth = getAuth();

// create-student
let studentSubmit = document.getElementById("studentSubmit");
let name = document.getElementById("name");
let fatherName = document.getElementById("fatherName");
let rollNumber = document.getElementById("rollNumber");
let contactNumber = document.getElementById("contactNumber");
let cnic = document.getElementById("cnic");
let courseName = document.getElementById("courseName");
let adminAssign = document.getElementById("adminAssign");
let imageUpload = document.getElementById("imageUpload");

studentSubmit.addEventListener("click", async () => {
  try {
    const docRef = await addDoc(collection(db, "studentData"), {
      Name: name.value,
      fatherName: fatherName.value,
      rollNumber: rollNumber.value,
      contactNumber: contactNumber.value,
      cnic: cnic.value,
      courseName: courseName.value,
      adminAssign: adminAssign.value,
    });
    const uploadFiles = (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, `users/${auth.currentUser.uid}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    let file = imageUpload.files[0];
    let url = await uploadFiles(file);

    const washingtonRef = doc(db, "studentData", docRef.id);
    await updateDoc(washingtonRef, {
      Profile: url,
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errror=>" + errorCode, errorMessage);
  }
});
