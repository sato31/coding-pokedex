
// Se obtienen los datos de la fuente de información
const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const main = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
}

// Se normalizan los datos
    
main()