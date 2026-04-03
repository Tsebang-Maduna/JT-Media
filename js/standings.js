// Load matches from localStorage
const matches = JSON.parse(localStorage.getItem('matches')) || [];

// Object to store team stats
const table = {};

// Loop through matches and calculate stats
matches.forEach(match => {
  const { home, away, homeScore, awayScore } = match;

  // Initialize teams if not exist
  if (!table[home]) {
    table[home] = { played: 0, wins: 0, draws: 0, losses: 0, points: 0 };
  }

  if (!table[away]) {
    table[away] = { played: 0, wins: 0, draws: 0, losses: 0, points: 0 };
  }

  // Played
  table[home].played++;
  table[away].played++;

  // Match result logic
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

// Convert object → array and sort by points
const sorted = Object.entries(table).sort((a, b) => b[1].points - a[1].points);

// Get table body
const tbody = document.getElementById('standings-body');

// Clear existing rows
tbody.innerHTML = '';

// Render table
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