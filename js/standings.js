fetch('data/standings.json')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('standings-body');

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