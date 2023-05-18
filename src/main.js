const API_KEY = "033ffc66c5177cc7178a59750e2932ce";
const URL = "http://api.openweathermap.org/geo/1.0/direct?";
let ciudad = "London";
let tempMax;
let tempMin;
let humedad;
let termica;
let presion;
let velocidadViento;


function devolverClima (){

    fetch(`${URL}q=${ciudad}&appid=${API_KEY}`)
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        let latitud = data[0].lat;
        let longitud = data[0].lon;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.main.temp);
            tempMax = Math.floor((data.main.temp_max - 32)/1.8) + " C";
            tempMin = (data.main.temp_min - 32)/1.8 + " C";;
            termica = data.main.feels_like;
            humedad = data.main.humidity;
            presion = data.main.pressure;
            velocidadViento = data.wind.speed;   
            console.log(velocidadViento);
            
            console.log(tempMax);


        })

    });
};
devolverClima();