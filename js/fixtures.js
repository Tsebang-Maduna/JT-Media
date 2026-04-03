/*fetch('data/fixtures.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('fixtures-container');

    data.forEach(match => {
      container.innerHTML += `
        <div class="match">
          <p>${match.home} vs ${match.away}</p>
          <p>${match.score}</p>
          <p>${match.time}</p>
        </div>
      `;
    });
  });
  */
import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("fixtures-container");

onSnapshot(collection(db, "matches"), (snapshot) => {
  container.innerHTML = "";

  snapshot.forEach(doc => {
    const match = doc.data();

    container.innerHTML += `
      <div class="match-card">
        <div class="match-teams">
          <span>${match.home}</span>
          <span>${match.away}</span>
        </div>
        <div class="match-score">
          ${match.homeScore} - ${match.awayScore}
        </div>
      </div>
    `;
  });
});