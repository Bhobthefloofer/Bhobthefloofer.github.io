
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
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
        const secret = document.getElementById('secret')

        secret.style.display = 'none'
        const userSignUp =  async () => {
            const signUpEmail = userEmail.value
            const signUpPassword = userPassword.value
            createUserWithEmailAndPassword(auth, signUpEmail,signUpPassword)
            .then ( (userCredential) => {
                const user = userCredential.user
                alert ('account created!')

            }

            )
            .catch ((error)=> {
                alert(error)
            })
        }
        signUpBtn.addEventListener('click', userSignUp)
        const userSignIn =  async () => {
            const signInEmail = userEmail.value
            const signInPassword = userPassword.value
            signInWithEmailAndPassword(auth, signInEmail,signInPassword)
            .then ( (userCredential) => {
                const user = userCredential.user
                alert ('logged in!')

            }

            )
            .catch ((error)=> {
                alert(error)
            })
        }

        signInBtn.addEventListener('click', userSignIn)

        const checkAuth =  async () => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    authForm.style.display = 'none'
                    secret.style.display = 'block'
                }
                else {
                    authForm.style.display = 'block'
                    secret.style.display = 'none'
                }
            })

            
            
            
        }
        checkAuth()

        const userSignOut =  async () => {
            await signOut(auth)
        }
        signOutBtn.addEventListener('click', userSignOut)
