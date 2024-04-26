class StatsScreen {
  constructor() {
      this.statsScreen = document.getElementById('statsScreen');
  }

  printStats(pokemon) {
      const { stats } = pokemon;
      this.statsScreen.innerHTML = '';
      stats.forEach(stat => {
          const statItem = `
              <p class='stats-screen-item'>${stat.stat.name}: <span>${stat.base_stat}</span></p>
          `;
          this.statsScreen.innerHTML += statItem;
      });
  }
}

const statsScreen = new StatsScreen();

document.getElementById('search').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); 
      const pokemonId = this.value.toLowerCase();
      const apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

      fetch(apiUrl)
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('No se encontró el Pokémon.');
          })
          .then(data => {
              const pokemonName = data.name; 
              const pokemonImage = data.sprites.front_default; 

              document.getElementById('screen').innerHTML = '<img src="' + pokemonImage + '" alt="' + pokemonName + '">';
              document.getElementById('name').textContent = pokemonName;

              statsScreen.printStats(data);
          })
          .catch(error => {
              console.error('Error:', error);
              document.getElementById('screen').innerHTML = '<p>Pokémon no encontrado. Intente con otro nombre o ID.</p>';
              document.getElementById('name').textContent = 'Pokémon no encontrado';
              document.getElementById('statsScreen').innerHTML = ''; 
          });
  }
});
