import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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
const auth = getAuth();

// Login-Form
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginSubmit = document.getElementById("loginSubmit");

// loader Stated
let loader = document.getElementById("loader");

loginSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const emailRegix =
  /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email.value);
  const passwordRegix = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(
    password.value
  );
  if (!emailRegix) {
    swal("Warning", "Please Valid Email Address", "error");
  } else if (!passwordRegix) {
    swal("Warning", "Please Valid Password", "error");
  } else if (emailRegix && passwordRegix) {
    loader.style.display = "block";
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.pathname = "/admin.html";
      })
      .finally(() => {
        email.value = "";
        password.value = "";
        loader.style.display = "none";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal(
          "Warning",
          "Admin is Not Found Please Correct Email and Password",
          "error"
        );
      });
  }
});

window.onload = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (window.location.pathname === "/index.html") {
          window.location.href = "admin.html";
        }
      } else {
        if (window.location.pathname === "/admin.html") {
          window.location.href = "index.html";
        }
      }
    });
  };
