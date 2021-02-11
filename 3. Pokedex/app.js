const searchInput = document.querySelector('.recherche-poke input');
let allPokemon = [];
let tableauFin = []; 

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
        .then((pokeData) => {
                objPokemonFull.pic = pokeData.sprites.front_default;
                objPokemonFull.type = pokeData.types[0].type.name;

                fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then(response => response.json()
                //     {
                //     if(response.status === 404)
                //         {
                //             // response.json()
                //             console.log('toto');                            
                //             // console.log(response);
                //         }
                //     // else
                //     //     console.log('tata');
                // }
                )
                .then((pokeData) => 
                    {                    
                        // console.log(pokeData);                                                         
                        objPokemonFull.name = pokeData.names[4].name;
                        // console.log(objPokemonFull);
                        allPokemon.push(objPokemonFull);
                        // console.log(allPokemon);
                        if(allPokemon.length === 149)
                            {
                                console.log(allPokemon);
                            }
                    });
                    //    console.log(allPokemon);     
            });
    };
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


