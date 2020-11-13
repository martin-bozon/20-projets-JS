function AppelAPI(long, lat, CleaAPI)
    {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=minutely&units=metric&lang=fr&appid='+CleaAPI+'')
        .then((reponse)=>
            {
                return reponse.json();
            })
        .then((data) =>
            {
                console.log(data);
            });
    }