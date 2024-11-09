import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
        import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

        const firebaseConfig = {
            apiKey: "AIzaSyCyW2mK7zbaeQ6jIqzumE1no3h-pL6aBXs",
            authDomain: "wad2test-43dc0.firebaseapp.com",
            databaseURL: "https://wad2test-43dc0-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "wad2test-43dc0",
            storageBucket: "wad2test-43dc0.appspot.com",
            messagingSenderId: "581094929615",
            appId: "1:581094929615:web:927fb1303429498d1033ba"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getDatabase()

        const userEmail = document.getElementById('userEmail');
        const userName = document.getElementById('userName');
        const userPassword = document.getElementById('userPassword');
        const userPasswordConfirm = document.getElementById('userPasswordConfirm');
        const signUpBtn = document.getElementById('signUp');
        const signInBtn = document.getElementById('login');


        const validatePassword = () => {
            const password = userPassword.value;
            const length = password.length >= 8;
            const uppercase = /[A-Z]/.test(password);
            const symbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            document.getElementById('length').className = length ? 'valid criteria' : 'invalid criteria';
            document.getElementById('capital').className = uppercase ? 'valid criteria' : 'invalid criteria';
            document.getElementById('symbol').className = symbol ? 'valid criteria' : 'invalid criteria';

            // Hide message if all criteria are valid
            if (length && uppercase && symbol) {
                document.getElementById('message').style.display = 'none'; // Hide the message
            } else {
                document.getElementById('message').style.display = 'block'; // Show the message
            }

            return length && uppercase && symbol;
        };

        const validateConfirmPassword = () => {
            const errorElement = document.getElementById('passwordError');
            if (userPassword.value !== userPasswordConfirm.value) {
                errorElement.textContent = 'Passwords do not match';
                errorElement.classList.remove('success');
                errorElement.classList.add('error');
                return false;
            } else {
                errorElement.textContent = '';
                return true;
            }
        };

        const validateForm = () => {
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            return isPasswordValid && isConfirmPasswordValid;
        };

        userPassword.addEventListener('input', () => {
            validatePassword();
        });

        userPasswordConfirm.addEventListener('input', () => {
            validateConfirmPassword();
        });
        function insertData() {
            set(ref(db, "people/" + userName.value,),
                {
                    Name: userName.value,
                    Email: userEmail.value

                }
            )
                .then(() => {
                    localStorage.setItem('name', userName.value);
                    window.location.href = 'after-sign-in-1.html';
                })
                .catch((error) => {
                    alert(error)
                })
        }

        signUpBtn.addEventListener('click', async () => {
            const email = userEmail.value;
            const password = userPassword.value;

            if (validateForm()) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    insertData()


                } catch (error) {
                    alert('Error: ' + error.message);
                }
            }
        });

        signInBtn.addEventListener('click', () => {
            // Redirect to login page or handle login logic
            window.location.href = 'login-page.html'; // Change to your login page
        });