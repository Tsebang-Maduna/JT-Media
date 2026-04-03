const password = prompt("Enter admin password:");

if (password !== "tsebza26") {
  alert("Access denied");
  throw new Error("Unauthorized");
}

import { db, auth } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

//page protection
onAuthStateChanged(auth, (user) => {
    if(!user){
        alert("You must log in first!");
        window.location.href = "login.html";
    }
})

//form logic
const form = document.getElementById('match-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "matches"), {
    home: document.getElementById('home').value,
    away: document.getElementById('away').value,
    homeScore: parseInt(document.getElementById('homeScore').value),
    awayScore: parseInt(document.getElementById('awayScore').value)
  });

  alert("Match added!");
});