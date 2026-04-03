import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("live-match");

onSnapshot(collection(db, "matches"), (snapshot) => {

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const match = doc.data();

    container.innerHTML = `
      <div class="match-card">
        <div class="match-teams">
          ${match.home} vs ${match.away}
        </div>
        <div class="match-score">
          ${match.homeScore} - ${match.awayScore}
        </div>
      </div>
    `;
  });

});