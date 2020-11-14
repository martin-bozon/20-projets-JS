const CleaAPI = '963043c0bc453489840bf34f01be206d';
let resultatsAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-prevision-nom');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => 
            {
                let long = position.coords.longitude;
                let lat = position.coords.latitude;
                AppelAPI(long, lat, CleaAPI, temps, temperature, localisation);
            }, () => 
                    {
                        alert('Vous avez refusé la géolocalisation');
                    }
            );
    }
    

function AppelAPI(long, lat, CleaAPI, temps, temperature, localisation)
    {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=minutely&units=metric&lang=fr&appid='+CleaAPI+'')
        .then((reponse)=>
            {
                return reponse.json();
            })
        .then((data) =>
            {
                console.log(data);
                resultatsAPI = data;

                temps.innerText = resultatsAPI.current.weather[0].description;
                temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
                localisation.innerText = resultatsAPI.timezone;

                //Heure toutes les 3h
                let heureActuelle = new Date().getHours();                
                for(let i = 0;i<heure.length; i++)
                    {
                        let heureIncr = heureActuelle + i * 3;

                        if(heureIncr>24)
                            {
                                heure[i].innerText = `${heureIncr-24} h`;
                            }
                        else if(heureIncr===24)
                            {
                                heure[i].innerText = `00 h`;
                            }
                        else    
                            {
                                heure[i].innerText = `${heureIncr} h`;
                            }
                    }

                // Temps toutes les 3h
                for(let j = 0; j<tempPourH.length; j++)
                    {
                        tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j*3].temp)}°`;
                    }

            });
    }