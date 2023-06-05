const pokedexContainer = document.getElementById('pokedexContainer');
const typeList = document.getElementById('typeList');
let pokemons = [];

async function buscarPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const pokemon = {
        id: data.id,
        name: data.name.toUpperCase(),
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        height: data.height,
        weight: data.weight
    };

    pokemons.push(pokemon);
    mostrarPokemon(pokemon);
}

function mostrarPokemon(pokemon) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');
    tarjeta.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <div class="tarjeta-details">
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
            <p>Tipos: ${pokemon.types.join(', ').toUpperCase()}</p>
        </div>
    `;

    pokedexContainer.appendChild(tarjeta);
}

async function fetchTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();

    const typeColors = {
        "steel": "#A8A8C0",
        "water": "#3899F8",
        "bug": "#A8B820",
        "dragon": "#7860E0",
        "electric": "#F8D030",
        "ghost": "#6060B0",
        "fire": "#F05030",
        "fairy": "#E79FE7",
        "ice": "#58C8E0",
        "fighting": "#A05038",
        "normal": "#A8A090",
        "grass": "#78C850",
        "psychic": "#F870A0",
        "rock": "#B8A058",
        "dark": "#7A5848",
        "ground": "#E9D6A4",
        "poison": "#B058A0",
        "flying": "#98A8F0"
    };

    const typeTranslation = {
        "steel": "acero",
        "water": "agua",
        "bug": "bicho",
        "dragon": "dragón",
        "electric": "eléctrico",
        "ghost": "fantasma",
        "fire": "fuego",
        "fairy": "hada",
        "ice": "hielo",
        "fighting": "lucha",
        "normal": "normal",
        "grass": "planta",
        "psychic": "psíquico",
        "rock": "roca",
        "dark": "siniestro",
        "ground": "tierra",
        "poison": "veneno",
        "flying": "volador"
    };

    data.results.forEach(type => {
        if (typeColors.hasOwnProperty(type.name)) {
            const typeItem = document.createElement('li');
            typeItem.textContent = typeTranslation[type.name];
            typeItem.style.textTransform = 'capitalize';
            typeItem.style.backgroundColor = typeColors[type.name];
            typeItem.addEventListener('click', () => {
                filtrarPokemonsPorTipo(type.name);
                document.body.style.backgroundColor = typeColors[type.name]; // Cambia el color de fondo
            });
            typeList.appendChild(typeItem);
        }
    });
}

function filtrarPokemonsPorTipo(type) {
    pokedexContainer.innerHTML = '';
    pokemons.filter(pokemon => pokemon.types.includes(type)).forEach(pokemon => {
        mostrarPokemon(pokemon);
    });
}

async function main() {
    await fetchTypes();
    for (let i = 1; i <= 151; i++) {
        await buscarPokemon(i);
    }
}

main();
