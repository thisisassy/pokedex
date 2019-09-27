const poke_container = document.getElementById('poke-container');

const pokemons_number = 809;
const colors = {
    bug: '#D4AC0D',
  dark: '#1C2833',
  dragon: '#1A5276',
  electric: '#F7DC6F',
  fairy: '#FADBD8 ',
  fighting: '#E74C3C',
  fire: '#DC7633 ',
  flying: '#AED6F1',
  ghost: '#A569BD',
  grass: '#7DCEA0',
  ground: '#784212 ',
  ice: '#7FB3D5',
  normal: '#F7F9F9',
  poison: '#7D3C98',
  psychic: '#FAE5D3',
  rock: '#5D6D7E',
  steel: '#B3B6B7',
  water: '#85C1E9'
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemons_number; i++){
        await getPokemon(i);
    }
};

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');

    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `<div class="img-container"><img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" /></div> <div class="info"><span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
    <h3 class="name">${name}</h3><small class="type">Type: <span class="type">${type}</span></small></div>`;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();
