function searchPokemonData() {
  const pokemonId = pokemonNumber.textContent;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      display.textContent = `Moves: ${data.moves.map(move => move.move.name).join(', ')}
                             Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}
                             Type: ${data.types.map(type => type.type.name).join(', ')}`;
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      display.textContent = 'Error al buscar el Pokémon';
    });
}

document.getElementById('search').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Previene la funcionalidad por defecto del Enter

      // Obtiene el valor ingresado en el input
      var pokemonId = this.value.toLowerCase();

      // Crea la URL para la PokeAPI
      var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

      // Llama a la API para obtener información del Pokémon
      fetch(apiUrl)
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('No se encontró el Pokémon.');
          })
          .then(data => {
              var pokemonName = data.name; // Nombre del Pokémon
              var pokemonImage = data.sprites.front_default; // Imagen del Pokémon

              document.getElementById('screen').innerHTML = '<img src="' + pokemonImage + '" alt="' + pokemonName + '"><p>' + pokemonName + '</p>';
          })
          .catch(error => {
              console.error('Error:', error);
              document.getElementById('screen').innerHTML = '<p>Pokémon no encontrado. Intente con otro nombre o ID.</p>';
          });
  }
});
