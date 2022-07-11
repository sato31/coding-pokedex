'use strict'
// Se obtiene el element raiz HTML
const contenedorTarjetas = document.querySelector('#contenedor-tarjetas');
const searchPokemon = document.querySelector('#search');
let pokemons = [];
let cards = [];

// Se obtienen los datos de la fuente de información
const api = './api/pokes.json'

const main = () => {
    fetch(api)
    .then(response => response.json())
    .then(data => normalizeData(data))
    .then(pokemons => convertData(pokemons))
    .then(pokemons => pokemons.forEach(renderCard))
}

// Se normalizan los datos
const normalizeData = (data) => {
    data.forEach(element => {
        const { number, name, ThumbnailImage, type, weight, height, abilities, weakness } = element;
        const pokemon = {
            numero: number,
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

const convertData = (pokemons) =>{
    pokemons.forEach(poke => {
        poke.peso = (poke.peso / 2.205).toFixed(2); // Convierte lb a kg
        poke.tamaño = (poke.tamaño / 39.37).toFixed(2); // Convierte lb a kg
    })
    for (let i = 0; i < pokemons.length; i++) {       
        for (let j = 0; j < pokemons[i].tipo.length; j++) {
            let subtipo = pokemons[i].tipo[j] 
            pokemons[i].tipo[j] = (subtipo[0].toUpperCase() + subtipo.substring(1));
        }
    }
    return pokemons;
}

//función que renderiza (pinta) la informacion de cada tarjeta
const renderCard = (element) => {

    // Se crean los elementos html desde javascript
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
    footerCardDiv.classList.add('none');

    // Se añade la herencia de de los elementos con appendChild
    contenedorTarjetas.appendChild(cardPokeDiv);
    cardPokeDiv.appendChild(headerCardDiv);
    headerCardDiv.appendChild(numPokeDiv);
    numPokeDiv.appendChild(numPokeH2);
    headerCardDiv.appendChild(nombrePokeDiv);
    nombrePokeDiv.appendChild(nombrePokeH2);
    cardPokeDiv.appendChild(containerImgDiv);
    containerImgDiv.appendChild(pokeImg);
    cardPokeDiv.appendChild(tiposDiv);
    cardPokeDiv.appendChild(footerCardDiv);
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
    const { numero, nombre, imagen, tipo, peso, tamaño, habilidades, debilidades } = element;

    // Se asignan los atributos html (src, id) a cada etiqueta

    cardPokeDiv.setAttribute('id', 'tarjeta-poke');
    headerCardDiv.setAttribute('id', 'encabezado-tarjeta');
    numPokeDiv.setAttribute('id', 'num-poke');
    nombrePokeDiv.setAttribute('id', 'nombre-poke');
    containerImgDiv.setAttribute('id', 'contenedor-img');
    pokeImg.setAttribute('id', 'img');
    pokeImg.setAttribute('src', imagen);
    tiposDiv.setAttribute('id', 'contenedor-tipos');
    footerCardDiv.setAttribute('id', 'pie-tarjeta');
    containerHabDiv.setAttribute('id', 'contenedor-hab');
    containerDebDiv.setAttribute('id', 'contenedor-deb');

    // Se escribe la información de cada pokémon en el HTML desde el arreglo pokemons
    numPokeH2.innerHTML = numero;
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
        if (tipo === 'Steel') {
            tipoH4.classList.add('steel');           
        } else if(tipo === 'Water'){
            tipoH4.classList.add('water'); 
        } else if(tipo === 'Bug'){
            tipoH4.classList.add('bug'); 
        } else if(tipo === 'Dragon'){
            tipoH4.classList.add('dragon'); 
        } else if(tipo === 'Electric'){
            tipoH4.classList.add('electric'); 
        } else if(tipo === 'Ghost'){
            tipoH4.classList.add('ghost'); 
        } else if(tipo === 'Fire'){
            tipoH4.classList.add('fire'); 
        } else if(tipo === 'Fairy'){
            tipoH4.classList.add('fairy'); 
        } else if(tipo === 'Ice'){
            tipoH4.classList.add('ice'); 
        } else if(tipo === 'Fighting'){
            tipoH4.classList.add('fighting'); 
        } else if(tipo === 'Normal'){
            tipoH4.classList.add('normal'); 
        } else if(tipo === 'Grass'){
            tipoH4.classList.add('grass'); 
        } else if(tipo === 'Psychic'){
            tipoH4.classList.add('psychic'); 
        } else if(tipo === 'Rock'){
            tipoH4.classList.add('rock'); 
        } else if(tipo === 'Dark'){
            tipoH4.classList.add('dark'); 
        } else if(tipo === 'Ground'){
            tipoH4.classList.add('ground'); 
        } else if(tipo === 'Poison'){
            tipoH4.classList.add('poison'); 
        } else if(tipo === 'Flying'){
            tipoH4.classList.add('flying'); 
        }
        tipoH4.innerHTML = tipo;
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
    debilH4.innerHTML = 'Weaknesses'
    debilidades.forEach(debilidad => {
        const debilP = document.createElement('p');
        containerDebDiv.appendChild(debilP);
        debilP.innerHTML = debilidad;
    });
};

const arrFoot = ['' , '']
contenedorTarjetas.addEventListener('click', (event) => {
    const currentCard = event.target;
    const pieTarjeta = currentCard.lastChild;
    arrFoot[0] = arrFoot[1];
    arrFoot[1] = pieTarjeta;
    if (arrFoot[0] !== '')  arrFoot[0].classList.add('none');
    arrFoot[1].classList.remove('none');
});

const cleanView = () => {
    contenedorTarjetas.innerHTML ='';
};

searchPokemon.addEventListener('keyup', (event) => {
    const inputText = event?.target?.value.toLocaleLowerCase() || '';
    cleanView();
    const pokesFounded = searchingWithFilter(inputText);
    pokesFounded.forEach(renderCard);
});

const searchingWithFilter = (searchingText) => {
    const pokesFounded = pokemons.filter(pokemon => {
        const nombre = pokemon.nombre;
        return (nombre.toLocaleLowerCase()).includes(searchingText)
    });
    return pokesFounded;
};

const select = document.querySelector('#selector-types')

select.addEventListener('change',(event)=>{
    let chosenType = event?.target?.value || '';
    if (chosenType === 'All') {
        cleanView()
        pokemons.forEach(renderCard)
    }
    else{
        const allPokemonsWithType = pokemons.filter( pokemon => {
            const pokemonType = pokemon.tipo
            return pokemonType.includes(chosenType)
        })
        cleanView()
        allPokemonsWithType.forEach(renderCard)
    }
})

main()

// Conversiones y Mayuscula en funcion
// Tarjeta de colores de acuerdo al tipo:
// 2 tipos (header 1 color y footer otro color)
// Esconder footer 
// Añadir evento que muestre footer al clickar cada tarjeta
