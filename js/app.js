async function loadMatches() {
    const response = await fetch("data/matches.json");
    const matches = await response.json();

    showFeatured(matches);
}

function showFeatured(matches) {
    const container = document.getElementById("featuredMatches");

    if (!container) return;

    matches.slice(0, 2).forEach(match => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <p>${match.teamA} vs ${match.teamB}</p>
            <small>${match.date} - ${match.time}</small>
        `;

        container.appendChild(div);
    });
}

loadMatches();


fetch('data/standings.json')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('standings-body');
    table.innerHTML = '';

    data.forEach((team, index) => {
      table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${team.team}</td>
          <td>${team.played}</td>
          <td>${team.wins}</td>
          <td>${team.draws}</td>
          <td>${team.losses}</td>
          <td>${team.points}</td>
        </tr>
      `;
    });
  });