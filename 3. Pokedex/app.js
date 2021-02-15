const searchInput = document.querySelector('.recherche-poke input');
let allPokemon = [];
let tableauFin = []; 
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');
const main = document.querySelector('main');

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
                                        chargement.style.display = "none";
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
                let couleur = types[tableau[i].type];
                carte.style.background = couleur;
                carte.classList.add("carte")
                carte.setAttribute('id', tableau[i].id);
                carte.classList.add('myBtn')
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
        const li = document.getElementsByClassName('carte');                                           
        
        for(i=0; i<li.length ; i++)
            {                                
                let a = i;
                li[i].addEventListener('click', () =>
                    {
                        let id = li[a].getAttribute('id');                                            
                        fetchPokeModal(id);                                                
                    })
            }
    }                

// Modal
function fetchPokeModal(id)
    {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(reponse => reponse.json())
        .then((pokemon) =>
            {                
                console.log(pokemon);
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
                .then(response => response.json())
                .then((pokeData) => 
                    {                               
                        const modal = document.createElement('div');
                        modal.classList.add('modal');                                                                   
                        const divModal = document.createElement('div');
                        let couleurbg = types[pokemon.types[0].type.name];
                        divModal.classList.add('modal-content');
                        divModal.style.background = couleurbg;  
                        const infoPoke = document.createElement('div');
                        infoPoke.classList.add('info-poke');
                        const nom = document.createElement('h3');                        
                        const poids = document.createElement('p');                        
                        const taille = document.createElement('p');

                        nom.innerText = pokeData.names[4].name;
                        poids.innerText = 'Poids : ' +pokemon.weight/10 + ' kg';
                        taille.innerText = 'Taille :' +pokemon.height/10 + ' m';
        
                        // const close = document.createElement('span');
                        // close.classList.add('close');
                        // close.innerText = 'fermer';
        
                        const stats = document.createElement('div');
                        stats.classList.add('stats');
                        const statTitle = document.createElement('h3')
                        const hp = document.createElement('p');
                        const attaque = document.createElement('p');
                        const defense = document.createElement('p');
                        const aSpe = document.createElement('p');
                        const dSpe = document.createElement('p');
                        const vitesse = document.createElement('p');
        
                        statTitle.innerText = 'Statistiques';
                        hp.innerText = 'PV : '+pokemon.stats[0].base_stat;
                        attaque.innerText ='Attaque : ' +pokemon.stats[1].base_stat;
                        defense.innerText = 'Défense : ' +pokemon.stats[2].base_stat;
                        aSpe.innerText = 'Attaque Spé : ' +pokemon.stats[3].base_stat;
                        dSpe.innerText = 'Défense Spé : ' +pokemon.stats[4].base_stat;
                        vitesse.innerText = 'Vitesse : ' +pokemon.stats[5].base_stat;
                                
                        main.appendChild(modal);
                        modal.appendChild(divModal);

                        // divModal.appendChild(close);
                        divModal.appendChild(infoPoke)
                        infoPoke.appendChild(nom);
                        infoPoke.appendChild(poids);
                        infoPoke.appendChild(taille);
                        divModal.appendChild(stats);

                        // Initialisation des éléments
                        stats.appendChild(statTitle)
                        stats.appendChild(hp);
                        stats.appendChild(attaque);
                        stats.appendChild(defense);
                        stats.appendChild(aSpe);
                        stats.appendChild(dSpe);
                        stats.appendChild(vitesse);                                                
                        
                        modal.style.display = "block";

                        // When the user clicks anywhere, close it
                        window.onclick = function() 
                            {                                
                                modal.style.display = "none";                                                                      
                            }                        
                    });        
            })
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


