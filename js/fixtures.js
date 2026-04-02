fetch('data/fixtures.json')
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