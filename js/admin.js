const form = document.getElementById('match-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const match = {
    home: document.getElementById('home').value,
    away: document.getElementById('away').value,
    homeScore: parseInt(document.getElementById('homeScore').value),
    awayScore: parseInt(document.getElementById('awayScore').value)
  };

  let matches = JSON.parse(localStorage.getItem('matches')) || [];
  matches.push(match);

  localStorage.setItem('matches', JSON.stringify(matches));

  alert('Match Added!');
});