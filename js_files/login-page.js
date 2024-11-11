// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyW2mK7zbaeQ6jIqzumE1no3h-pL6aBXs",
    authDomain: "wad2test-43dc0.firebaseapp.com",
    databaseURL: "https://wad2test-43dc0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wad2test-43dc0",
    storageBucket: "wad2test-43dc0.appspot.com",
    messagingSenderId: "581094929615",
    appId: "1:581094929615:web:927fb1303429498d1033ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')

const signUpBtn = document.getElementById('signUp')
const signInBtn = document.getElementById('signIn')
const signOutBtn = document.getElementById('signOut')
const authForm = document.getElementById('authForm')






signUpBtn.addEventListener('click', redirectSignUp)

function redirectSignUp() {
    window.location.href = "signup-page.html"
}

const userSignIn = async () => {
    const signInEmail = userEmail.value
    const signInPassword = userPassword.value
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            const user = userCredential.user

            window.location.href = "home.html";

        }

        )
        .catch((error) => {
            if (error.code == "auth/invalid-credential") {
                errorHeading.innerText="Incorrect Username or Password"
            }
            if (error.code == "auth/user-does-not-exist") {
                errorHeading.innerText="You do not have an account. Please log in instead"
            } 
            

        })
}

signInBtn.addEventListener('click', userSignIn)

const checkAuth = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {

        }
        else {

        }
    })




}
checkAuth()



