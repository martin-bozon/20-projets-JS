const CleaAPI = '963043c0bc453489840bf34f01be206d';
let resultatsAPI;

if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => 
            {
                let long = position.coords.longitude;
                let lat = position.coords.latitude;
                AppelAPI(long, lat, CleaAPI);
            }, () => 
                    {
                        alert('Vous avez refusé la géolocalisation');
                    }
            );
    }

    