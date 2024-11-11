// Function to update progress bar
function updateProgress(stepIndex) {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.remove('active');

    if (stepIndex === 0) {
        document.getElementById('step1').classList.add('active');
    } else if (stepIndex === 1) {
        document.getElementById('step2').classList.add('active');
    }
}

// Initialize carousel and progress update on 'Next' button click
document.getElementById('nextBtn').addEventListener('click', function () {
    const carousel = new bootstrap.Carousel('#carouselExample');
    carousel.next();
});

// Update progress bar on carousel slide change
document.getElementById('carouselExample').addEventListener('slid.bs.carousel', function (event) {
    updateProgress(event.to);
});
var name = localStorage.getItem('name')
var fullName = document.getElementById('q-1')
fullName.value = name
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

const role = document.getElementById('q-2');
const comName = document.getElementById('q2-2');
const comWeb = document.getElementById('q2-1');
const comType = document.getElementById('q2-3');
const nextBtn = document.getElementById('nextBtn');
const magicBtn = document.getElementById('redirectHome');







function insertData() {
    update(ref(db, "people/" + name,),
        {
            Role: role.value,
            Events: [
                {
                    title: 'Marketing Campaign Kickoff',
                    start: '2024-11-05T10:00:00',
                    extendedProps: {
                        description: 'Kickoff for the new marketing campaign!',
                        time: '10:00 AM - 11:00 AM'
                    }
                },
                {
                    title: 'Social Media Blitz',
                    start: '2024-11-10T14:00:00',
                    end: '2024-11-13T16:00:00',
                    extendedProps: {
                        description: 'Join us for a social media blitz across all platforms.',
                        time: '2:00 PM - 4:00 PM'
                    }
                },
                {
                    title: 'Customer Engagement Webinar',
                    start: '2024-11-20T14:00:00',
                    extendedProps: {
                        description: 'Engagement webinar with our customers.',
                        time: '2:00 PM - 3:30 PM'
                    }
                }
            ],
            Posts: [],
            ProfileURL: 'blank pfp.png'

        }
    )
        .then(() => {

        })
        .catch((error) => {
            alert(error)
        })
}
function insertData2() {
    update(ref(db, "people/" + name,),
        {
            CompanyName: comName.value,
            OfficialWebsite: comWeb.value,
            CompanyType: comType.value,
            CompanyDesc: '',
            

            initialCampaigns : [
                {
                    "title": "inspirations",
                    "header": "Save inspirations you find online with one click",
                    "date": "14/11/2024",
                    "time": "15:30",
                    "status": "draft",
                    "content": "Use Buffer browser extension to save Ideas from the Web. Highlight text or select an image and right-click...",
                    "file": "./clock.png",
                    "country": ["United States", "United Kingdom"]
                },
                {
                    "title": "plan",
                    "header": "This is a place to plan your content",
                    "date": "14/11/2024",
                    "time": "15:30",
                    "status": "published",
                    "content": "Save your ideas before converting them into posts. Brainstorm, plan ahead, and refine!",
                    "file": "./pen.png",
                    "country": ["Japan", "China", "Korea"]
                }
            ]


        }
    )
        .then(() => {

        })
        .catch((error) => {
            alert(error)
        })
}
nextBtn.addEventListener('click', async () => {



    insertData()


});
magicBtn.addEventListener('click', async () => {



    insertData2()
    window.location.href = 'home.html'



})