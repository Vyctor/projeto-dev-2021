const types = [
  "fire",
  "grass",
  "electric",
  "water",
  "ground",
  "rock",
  "fairy",
  "poison",
  "bug",
  "dragon",
  "psychic",
  "flying",
  "fighting",
  "normal",
];

const POKEMON_COUNT = 12;
const pokemonList = [];

const getType = (data) => {
  const apiTypes = data.map((type) => type.type.name);
  const type = types.find((type) => apiTypes.indexOf(type) > -1);
  return type;
};

const fetchPokemon = async (number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
  const response = await fetch(url).then((response) => response.json());
  const { id, name, types } = response;
  const type = getType(types);
  return { id, name, type };
};

const fetchAllPokemons = async () => {
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    const pokemon = await fetchPokemon(i);
    const card = makeCardHtml(pokemon.id, pokemon.name, pokemon.type);
    appendCard(card);
  }
};

const makeCardHtml = (id, name, type) => {
  return `
  <div class="card" id="card-${id}">
    <div class="title">
      <h2>${name}</h2>
      <small># ${id}</small>
    </div>
    <div class="img bg-${type}">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${name}" />
    </div>
    <div class="type ${type}">
      <p>Grass</p>
    </div>
    <button class="favorite" data-id=${id}>
      <div class="heart">
      </div>
    </button>
  </div>
`;
};

const appendCard = (card) => {
  const cards = document.querySelector(".cards");
  cards.innerHTML += card;
};

fetchAllPokemons();

console.log(pokemonList);
