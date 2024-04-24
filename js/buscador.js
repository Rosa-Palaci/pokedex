const display = document.getElementById('display');
const pokemonNumber = document.getElementById('pokemonNumber');
const apiButton = document.getElementById('apiButton');
const clearButton = document.getElementById('clearButton'); 
const buttons = document.querySelectorAll('#keypad button');

function appendToDisplay(number) {
  if (pokemonNumber.textContent.length < 3) { 
    pokemonNumber.textContent += number;
    display.textContent = pokemonNumber.textContent; 
  }
}

function clearDisplay() {
  pokemonNumber.textContent = '';
  display.textContent = ''; 
}

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    appendToDisplay(event.target.textContent);
  });
});

apiButton.addEventListener('click', searchPokemonData);
clearButton.addEventListener('click', clearDisplay); 

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
