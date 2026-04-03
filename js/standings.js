/*import { db } from "./firebase.js";
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
*/
import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onSnapshot(collection(db, "matches"), (snapshot) => {

  const table = {};
  const tbody = document.getElementById("standings-body");
  tbody.innerHTML = "";

  snapshot.forEach(doc => {
    const { home, away, homeScore, awayScore } = doc.data();

    if (!table[home]) {
      table[home] = { played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, points: 0 };
    }

    if (!table[away]) {
      table[away] = { played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, points: 0 };
    }

    // Goals
    table[home].gf += homeScore;
    table[home].ga += awayScore;

    table[away].gf += awayScore;
    table[away].ga += homeScore;

    // Played
    table[home].played++;
    table[away].played++;

    // Results
    if (homeScore > awayScore) {
      table[home].wins++;
      table[home].points += 3;
      table[away].losses++;
    } else if (homeScore < awayScore) {
      table[away].wins++;
      table[away].points += 3;
      table[home].losses++;
    } else {
      table[home].draws++;
      table[away].draws++;
      table[home].points += 1;
      table[away].points += 1;
    }
  });

  // Convert to array + sort
  const sorted = Object.entries(table).sort((a, b) => {
    const A = a[1];
    const B = b[1];

    const gdA = A.gf - A.ga;
    const gdB = B.gf - B.ga;

    return (
      B.points - A.points ||
      gdB - gdA ||
      B.gf - A.gf
    );
  });

  // Render
  sorted.forEach(([team, stats], index) => {
    const gd = stats.gf - stats.ga;

    let rowClass = "";

    if (index < 4) rowClass = "top-team";        // Top 4
    if (index >= sorted.length - 2) rowClass = "relegation"; // Bottom 2

    tbody.innerHTML += `
      <tr class="${rowClass}">
        <td>${index + 1}</td>
        <td>${team}</td>
        <td>${stats.played}</td>
        <td>${stats.wins}</td>
        <td>${stats.draws}</td>
        <td>${stats.losses}</td>
        <td>${stats.gf}</td>
        <td>${stats.ga}</td>
        <td>${gd}</td>
        <td>${stats.points}</td>
      </tr>
    `;
  });

});