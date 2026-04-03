import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = {};

onSnapshot(collection(db, "matches"), (snapshot) => {

  const tbody = document.getElementById('standings-body');
  tbody.innerHTML = '';

  const tempTable = {};

  snapshot.forEach(doc => {
    const match = doc.data();
    const { home, away, homeScore, awayScore } = match;

    if (!tempTable[home]) tempTable[home] = { played: 0, wins: 0, draws: 0, losses: 0, points: 0 };
    if (!tempTable[away]) tempTable[away] = { played: 0, wins: 0, draws: 0, losses: 0, points: 0 };

    tempTable[home].played++;
    tempTable[away].played++;

    if (homeScore > awayScore) {
      tempTable[home].wins++;
      tempTable[home].points += 3;
      tempTable[away].losses++;
    } else if (homeScore < awayScore) {
      tempTable[away].wins++;
      tempTable[away].points += 3;
      tempTable[home].losses++;
    } else {
      tempTable[home].draws++;
      tempTable[away].draws++;
      tempTable[home].points += 1;
      tempTable[away].points += 1;
    }
  });

  const sorted = Object.entries(tempTable).sort((a, b) => b[1].points - a[1].points);

  sorted.forEach(([team, stats], index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${team}</td>
        <td>${stats.played}</td>
        <td>${stats.wins}</td>
        <td>${stats.draws}</td>
        <td>${stats.losses}</td>
        <td>${stats.points}</td>
      </tr>
    `;
  });

});