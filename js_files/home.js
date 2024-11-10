
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        import { getStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
        import {ref as brrr}  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js" 
        import { getDatabase, set, get, update, remove, child, ref} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

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
        const storage = getStorage(app);
        const db = getDatabase()
        const name = "Saurabh"
        // localStorage.getItem('name')
        const disRole = document.getElementById("disRole") 
        const disName = document.getElementById("disName") 

        function findData() {
            const dbref = ref(db)
            get(child(dbref, "people/" + name))
                .then((snapshot) => {
                   
                    if (snapshot.exists()) {
                        imagePreview.src = snapshot.val().profileURL
                        disRole.innerText = snapshot.val().Role
                        disName.innerText = name


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
        findData()
        


        // Modal and profile handling
        const imagePreview = document.getElementById('imagePreview');
        const fileInput = document.getElementById('fileInput');
        const profileModal = document.getElementById('profileModal');
        const sidebar = document.getElementById('sidebar');

        document.getElementById('imageUploader').onclick = () => {
            profileModal.style.display = 'block';
        };

        document.getElementById('removeProfile').onclick = () => {
            imagePreview.src = '';
            profileModal.style.display = 'none';
        };

        document.getElementById('changeProfile').onclick = () => {
            fileInput.click();
            
            profileModal.style.display = 'none';
        };


        document.getElementById('cancel').onclick = () => {
            profileModal.style.display = 'none';
        };
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const storageRef = brrr(storage, 'profile_pictures/' + file.name);
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!', snapshot);
                    getDownloadURL(snapshot.ref).then((url) => {
                        imagePreview.src = url;
                        console.log(name)
                        update(ref(db, "people/" + name,),
                            {
                                profileURL : url

                            }
                        )
                            
                    });
                });
            }}
        // };
        // async function uploadImage() {

        //     const file = fileInput.files[0];
        //     console.log(file)

        //     if (file) {
        //         const storageRef = ref(storage, `profile_pictures/${file.name}`);
        //         await uploadBytes(storageRef, file);

        //         const imageURL = await getDownloadURL(storageRef);

        //         imagePreview.src = imageURL;
        //         update(ref(db, "people/" + name,),
        //             {
        //                 profileURL: imageURL

        //             })
        //     }
        // }

        // function findData() {
        //     const dbref = ref(db)
        //     get(child(dbref, "people/" + name))
        //         .then((snapshot) => {
        //             console.log(snapshot)
        //             if (snapshot.exists()) {
        //                 imagePreview.src = snapshot.val().profileURL


        //             }
        //             else {
        //                 alert("User doesnt exist")
        //             }
        //         })
        //         .catch((error) => {
        //             alert(error)
        //         }

        //         )
        // }



        // document.getElementById('imageUploader').onclick = () => {
        //     profileModal.style.display = 'block';
        // };

        // document.getElementById('removeProfile').onclick = () => {
        //     imagePreview.src = '';
        //     profileModal.style.display = 'none';
        // };

        // document.getElementById('changeProfile').onclick = () => {
        //     fileInput.click();
        //     profileModal.style.display = 'none';
        // };

        // document.getElementById('cancel').onclick = () => {
        //     profileModal.style.display = 'none';
        // };

        
        



        // Sidebar toggle functionality
        document.getElementById('hamburger').onclick = () => {
            sidebar.classList.toggle('collapsed');
        };
    