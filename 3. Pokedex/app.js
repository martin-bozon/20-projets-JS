const searchInput = document.querySelector('.recherche-poke input');
let allPokemon = [];
let tableauFin = []; 
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');

const types = {
    grass: '#78c850',
    ground: '#E2BF65',
    dragon: '#6F35FC',
    fire: '#F58271',
    electric: '#F7D02C',
    fairy: '#D685AD',
    poison: '#966DA3',
    bug: '#B3F594',
    water: '#6390F0',
    normal: '#D9D5D8',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
}

function fetchPokemonBase()
    {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => response.json())
        .then((allPoke) => {            
            allPoke.results.forEach((pokemon) => {
                fetchPokemonComplet(pokemon);
            })
        });
    }
fetchPokemonBase();

function fetchPokemonComplet(pokemon)
    {
        let objPokemonFull = {};
        let url = pokemon.url;
        let nameP = pokemon.name;        
        let pokeData ={};

        fetch(url)
        .then(response => response.json())
        .then((pokeData) => 
            {                
                objPokemonFull.pic = pokeData.sprites.front_default;
                objPokemonFull.type = pokeData.types[0].type.name;
                objPokemonFull.id = pokeData.id;
                let typeP = pokeData.types[0].type.name;

                fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then(response => response.json())
                .then((pokeData) => 
                    {                      
                        objPokemonFull.name = pokeData.names[4].name;

                        fetch(`https://pokeapi.co/api/v2/type/${typeP}`)
                        .then(reponse => reponse.json())
                        .then((pokeType) =>
                            {                                                                                 
                                objPokemonFull.typeFr = pokeType.names[2].name;                               
                                objPokemonFull.faible = pokeType.damage_relations.double_damage_from;
                                objPokemonFull.fort = pokeType.damage_relations.double_damage_to;                            
                                allPokemon.push(objPokemonFull);
                                if(allPokemon.length === 151)
                                    {
                                        tableauFin = allPokemon.sort((a,b) => {
                                            return a.id - b.id;
                                        }).slice(0,21);
                                        
                                        createCard(tableauFin);
                                        modal();                                                                     
                                        // chargement.style.display = "none";
                                    }
                            })
                    });  
            });
    };

// Création des cartes
function createCard(tableau)
    {
        for(let i = 0; i<tableau.length; i++)
            {
                const carte = document.createElement('li');
                let courleur = types[tableau[i].type];
                carte.style.background = courleur;
                carte.classList.add("carte")
                carte.setAttribute('id', tableau[i].id)
                const txtCarte = document.createElement('h5');
                txtCarte.innerText = tableau[i].name;
                const idCarte = document.createElement('span');
                idCarte.innerText = `ID# ${tableau[i].id}`;
                const imgCarte= document.createElement('img');
                imgCarte.src = tableau[i].pic;
                const typeCarte = document.createElement('p');
                typeCarte.innerText = `Type : ${tableau[i].typeFr}`

                carte.appendChild(imgCarte);
                carte.appendChild(txtCarte);
                carte.appendChild(idCarte);
                carte.appendChild(typeCarte);

                listePoke.appendChild(carte);

            }            
    }

// Modal
function modal()
    {
        const li = document.getElementsByClassName('carte').length;                                           
                                        
        console.log(li);  
    }

// Scroll
window.addEventListener('scroll', () =>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 20)
        {
            addPoke(6);
        }
});

let index = 21

function addPoke(nb)
    {
        if(index > 149)
            {
                return;
            }
        const arrToAdd = allPokemon.slice(index, index+nb);
        createCard(arrToAdd);
       modal();   
        index += nb;
    }

// Recherche

// Recherche avec le bouton 
// const formRecherche = document.querySelector('form');
// formRecherche.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     recherche();
    // })
    
searchInput.addEventListener('keyup', recherche);

function recherche()
    {
        if(index < 151)
            {
                addPoke(130);
            }
        let filter, allLi, titleValue, allTitles, allType, typyValue;
        filter = searchInput.value.toUpperCase();
        allLi = document.querySelectorAll('li');
        // tous les h5 présent dans les li
        allTitles = document.querySelectorAll('li > h5');
        allType = document.querySelectorAll('li > p');

        for(i=0; i< allLi.length; i++)
            {
                titleValue = allTitles[i].innerText;
                typeValue = allType[i].innerText;

                if(titleValue.toUpperCase().indexOf(filter) > -1 || typeValue.toUpperCase().indexOf(filter) > -1)
                    {
                        allLi[i].style.display = "flex";
                    }
                else
                    allLi[i].style.display = "none";
            }
    }


// Animation input
searchInput.addEventListener('input', function (e)
    {
        if(e.target.value !== "")
            {
                e.target.parentNode.classList.add('active-input');
            }
        else if (e.target.value === "")  
            {
                e.target.parentNode.classList.remove('active-input');
            }
    });


