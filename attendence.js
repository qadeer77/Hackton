import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
     getAuth,
     signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
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


let logout = document.getElementById("logout");

logout.addEventListener("click", (event)=> {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        window.location.pathname = "/index.html";
      })
      .catch((error) => {
        console.log(error);
      });
})