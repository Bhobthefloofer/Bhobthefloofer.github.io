
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
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
        const checkAuth = async () => {
            onAuthStateChanged(auth, user => {
                if (user) {



                    content.style.display = 'block'
                }
                else {
                    window.location.href = 'login-page.html'
                }
            })
        }
        checkAuth()
        import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

        const db = getDatabase()


        var name = document.getElementById('username').value
        var email = document.getElementById('email')
        var role = document.getElementById('role')
        var company = document.getElementById('organization')
        var comURL = document.getElementById('url')
        var comType = document.getElementById('type')
        var comDesc = document.getElementById('description')


        // var enterID = document.getElementById('email')
        // var enterName = document.getElementById('enterName')
        // var enterAge = document.getElementById('enterAge')
        // var findID = document.getElementById('findID')
        // var findName = document.getElementById('findName')
        // var findAge = document.getElementById('findAge')


        // var insertBtn = document.getElementById('insert')
        var updateBtn = document.getElementById('updatePersonalDetails')
        var updateBtnC = document.getElementById('updateComp')
        // var removeBtn = document.getElementById('remove')
        // var findBtn = document.getElementById('find')

        // function insertData() {
        //     set(ref(db, "people/" + enterID.value,),
        //         {
        //             Name: enterName.value,
        //             ID: enterID.value,
        //             Age: enterAge.value,
        //             Role: role.value

        //         }
        //     )
        //         .then(() => {
        //             alert("data added successfully")
        //         })
        //         .catch((error) => {
        //             alert(error)
        //         })
        // }
        function findData() {
            const dbref = ref(db)
            get(child(dbref, "people/" + name))
                .then((snapshot) => {
                    console.log("snapshot", snapshot)
                    if (snapshot.exists()) {
                        email.value = snapshot.val().Email
                        role.value = snapshot.val().Role
                        comURL.value = snapshot.val().OfficialWebsite
                        company.value = snapshot.val().CompanyName
                        comType.value = snapshot.val().CompanyType
                        comDesc.value = snapshot.val().CompanyDesc


                    }
                    else {
                        alert("User doesnt exist")
                    }
                })
                .catch((error) => {
                    alert(error)
                }

                )
        }
        // function removeData() {
        //     remove(ref(db, "people/" + enterID.value))
        //         .then(() => {
        //             alert("Data Deleted")
        //         }
        //         )
        //         .catch((error) => {
        //             alert(error)
        //         }

        //         )
        // }
        function updateDataR() {
            update(
                ref(db, "people/" + name), {
                Role: role.value,

            })
                .then(() => {
                    alert("Details Updated")
                }
                )
                .catch((error) => {
                    alert(error)
                }

                )


        }
        function updateDataC() {
            update(
                ref(db, "people/" + name), {
                CompanyName: company.value,
                OfficialWebsite: comURL.value,
                CompanyType: comType.value,
                CompanyDesc: comDesc.value
            })
                .then(() => {
                    alert("Data Updated")
                }
                )
                .catch((error) => {
                    alert(error)
                }

                )


        }
        // insertBtn.addEventListener('click', insertData)
        findData()
        // removeBtn.addEventListener('click', removeData)
        updateBtn.addEventListener('click', updateDataR)
        updateBtnC.addEventListener('click', updateDataC)

        