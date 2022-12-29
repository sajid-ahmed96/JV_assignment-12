// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCAxYEI-r1-3JHgxAGiKtHA5a-9uleDoQ",
    authDomain: "regform-11fbf.firebaseapp.com",
    projectId: "regform-11fbf",
    storageBucket: "regform-11fbf.appspot.com",
    messagingSenderId: "42774256315",
    appId: "1:42774256315:web:b40446ac3e47cea339e79e",
    measurementId: "G-DM44HK1W5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

var fName = document.getElementById('fName');
var lName = document.getElementById('lName')
var email = document.getElementById('email')
var password = document.getElementById('password')
var number = document.getElementById('number')
var cnicNumber = document.getElementById('cnicNumber')
var lastQualification = document.getElementById('lastQualification')
var course = document.getElementById('course')
var parent = document.getElementById('parent')

window.clearAll = function () {
    fName.value = ""
    lName.value = ""
    email.value = ""
    password.value = ""
    number.value = ""
    cnicNumber.value = ""
    lastQualification.value = ""
    course.value = ""
}

window.save = function () {
    var obj = {
        firstName: fName.value,
        lastName: lName.value,
        email: email.value,
        password: password.value,
        contact: number.value,
        cnicNumber: cnicNumber.value,
        lastQualification: lastQualification.value,
        course: course.value
    }
    // console.log(obj);
    obj.id = Math.random().toString().slice(2);
    const regref = ref(database, `RegForm/${obj.id}`);
    set(regref, obj)
        .then(function () {
            window.location.assign('home.html')
        })
        .catch(function (err) {
            console.log(err)
        })
    clearAll();
}

function getData() {
    var dataList = [];
    const regref = ref(database, "RegForm/");
    onChildAdded(regref, function (dt) {
        dataList.push(dt.val());
        console.log(dataList);
        parent.innerHTML = "";
        for (var i = 0; i < dataList.length; i++) {
            parent.innerHTML += "";
            parent.innerHTML += `<li>First Name: ${dataList[i].firstName}</li>`
            parent.innerHTML += `<li>Last Name: ${dataList[i].lastName}</li>`
            parent.innerHTML += `<li>Email: ${dataList[i].email}</li>`
            parent.innerHTML += `<li>Password: ${dataList[i].password}</li>`
            parent.innerHTML += `<li>Contact No: ${dataList[i].contact}</li>`
            parent.innerHTML += `<li>CNIC Number: ${dataList[i].cnicNumber}</li>`
            parent.innerHTML += `<li>Last Qualification: ${dataList[i].lastQualification}</li>`
            parent.innerHTML += `<li>Course: ${dataList[i].course}</li>`
        }
    })
}
getData()