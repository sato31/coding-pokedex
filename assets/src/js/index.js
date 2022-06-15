let pokemons = [];

// Se obtienen los datos de la fuente de información
// const api = 'https://pokeapi.co/api/v2/pokemon?limit=151';
// const api = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json'
const api = '../api/pokes.json'
const main = () => {
    fetch(api)
    .then(response => response.json())
    .then(data => normalizeData(data))
    .then(pokemons => console.log('Pokemons Kanto:' , pokemons))
}

// Se normalizan los datos
const normalizeData = (data) => {
    data.forEach(element => {
        const { number, name, ThumbnailImage, type, weight, height, abilities, weakness } = element;
        const pokemon = {
            id: number,
            nombre: name,
            imagen: ThumbnailImage,
            tipo: type,
            peso: weight,
            tamaño: height,
            habilidades: abilities,
            debilidades: weakness,
        };
        pokemons.push(pokemon);
    });
    return pokemons;
};    
main()