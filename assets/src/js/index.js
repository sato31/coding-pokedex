// Se obtiene el element raiz HTML
const contenedorTarjetas = document.querySelector('#contenedor-tarjetas');
let pokemons = [];

// Se obtienen los datos de la fuente de información
const api = '../api/pokes.json'
const main = () => {
    fetch(api)
    .then(response => response.json())
    .then(data => normalizeData(data))
    .then(pokemons => pokemons.forEach(renderCard))
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
            peso: (weight/ 2.205).toFixed(2), // Convierte lb a kg
            tamaño: (height / 39.37).toFixed(2), //Convierte in a m
            habilidades: abilities,
            debilidades: weakness,
        };
        pokemons.push(pokemon);
    });
    console.log(pokemons);
    return pokemons;
}; 

//función que renderiza (pinta) la informacion de cada tarjeta
const renderCard = (element) => {

    // Se crean los elementos html desde javascript
    const cardUniteDiv = document.createElement('div');
    const cardPokeDiv = document.createElement('div');
    const headerCardDiv = document.createElement('div');
    const numPokeDiv = document.createElement('div');
    const numPokeH2 = document.createElement('h2');
    const nombrePokeDiv = document.createElement('div');
    const nombrePokeH2 = document.createElement('h2');
    const containerImgDiv = document.createElement('div');
    const pokeImg = document.createElement('img');
    const tiposDiv = document.createElement('div');
    const footerCardDiv = document.createElement('div');
    const footerCardRow1Div = document.createElement('div');
    const heightDiv = document.createElement('div');
    const heightH4 = document.createElement('h4');
    const heigthP = document.createElement('p');
    const weightDiv = document.createElement('div');
    const weightH4 = document.createElement('h4');
    const weightP = document.createElement('p');
    const footerCardRow2Div = document.createElement('div');
    const containerHabDiv = document.createElement('div');
    const abilH4 = document.createElement('h4');
    const containerDebDiv = document.createElement('div');
    const debilH4 = document.createElement('h4');

    // Se añaden sus respectivas clases a cada elemento creado
    cardUniteDiv.classList.add('united-card');
    cardPokeDiv.classList.add('card');
    headerCardDiv.classList.add('header-card');
    containerImgDiv.classList.add('container-img');
    pokeImg.classList.add('img-poke');
    tiposDiv.classList.add('container-type');
    footerCardDiv.classList.add('footer-card');
    footerCardRow1Div.classList.add('footer-card-row-1');
    heightDiv.classList.add('height');
    weightDiv.classList.add('weight');
    footerCardRow2Div.classList.add('footer-card-row-2');
    containerHabDiv.classList.add('container-hab');
    containerDebDiv.classList.add('container-deb');

    // Se añade la herencia de de los elementos con appendChild
    contenedorTarjetas.appendChild(cardUniteDiv);
    cardUniteDiv.appendChild(cardPokeDiv);
    cardPokeDiv.appendChild(headerCardDiv);
    headerCardDiv.appendChild(numPokeDiv);
    numPokeDiv.appendChild(numPokeH2);
    headerCardDiv.appendChild(nombrePokeDiv);
    nombrePokeDiv.appendChild(nombrePokeH2);
    cardPokeDiv.appendChild(containerImgDiv);
    containerImgDiv.appendChild(pokeImg);
    cardPokeDiv.appendChild(tiposDiv);
    cardUniteDiv.appendChild(footerCardDiv);
    footerCardDiv.appendChild(footerCardRow1Div);
    footerCardRow1Div.appendChild(heightDiv);
    heightDiv.appendChild(heightH4);
    heightDiv.appendChild(heigthP);
    footerCardRow1Div.appendChild(weightDiv);
    weightDiv.appendChild(weightH4);
    weightDiv.appendChild(weightP);
    footerCardDiv.appendChild(footerCardRow2Div);
    footerCardRow2Div.appendChild(containerHabDiv);
    containerHabDiv.appendChild(abilH4);
    footerCardRow2Div.appendChild(containerDebDiv);
    containerDebDiv.appendChild(debilH4);

    // Destructuring de los elementos a utilizar del arreglo pokemons
    // (Para no escribir el prefijo element. en cada elemento del arreglo)
    const { id, nombre, imagen, tipo, peso, tamaño, habilidades, debilidades } = element;

    // Se guarda la imagen del pokemon en una nueva variable y se le asigna el atributo src 
    pokeImg.setAttribute('src', imagen);

    // Se escribe la información de cada pokémon en el HTML desde el arreglo pokemons
    numPokeH2.innerHTML = id;
    nombrePokeH2.innerHTML = nombre;
    heightH4.innerHTML = 'Height';
    heigthP.innerHTML = tamaño + ' m';
    weightH4.innerHTML = 'Weight';
    weightP.innerHTML = peso + ' kg';

    // Si el pokémon tiene 2 tipos, para cada tipo se crea el elemento html, 
    // se añade la clase, su elemento padre y escribe cada tipo.
    const tipos = tipo;
    tipos.forEach(tipo => {
        const tipoH4 = document.createElement('h4');
        tipoH4.classList.add('type');
        tiposDiv.appendChild(tipoH4);
        tipoH4.innerHTML = tipo[0].toUpperCase() + tipo.substring(1);
    });

    // Para cada habilidad se crea el elemento html, se añade su elemento padre
    // y se escribe la habilidad
    abilH4.innerHTML = 'Abilities';
    habilidades.forEach(habilidad => {
        const abilP = document.createElement('p');
        containerHabDiv.appendChild(abilP);
        abilP.innerHTML = habilidad;
    });

    // Para cada debilidad se crea el elemento html, se añade su elemento padre
    // y se escribe la debilidad
    debilH4.innerHTML = 'Weakness'
    debilidades.forEach(debilidad => {
        const debilP = document.createElement('p');
        containerDebDiv.appendChild(debilP);
        debilP.innerHTML = debilidad;
    });
}

const cleanView = () => {
    contenedorTarjetas.innerHTML = '';
};

main()