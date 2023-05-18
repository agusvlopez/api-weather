const API_KEY = "033ffc66c5177cc7178a59750e2932ce";
const URL = "http://api.openweathermap.org/geo/1.0/direct?";

const elementoBotonInput = document.getElementById("btnClima");
const elementoDatos = document.getElementById('datos');
const imgFondoClima = document.getElementById('container');

elementoBotonInput.addEventListener("click", devolverClima);

function devolverClima (){

  let elementoInput = document.getElementById("inputClima").value;
console.log(elementoInput)

    fetch(`${URL}q=${elementoInput}&appid=${API_KEY}`) 
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        let latitud = data[0].lat;
        let longitud = data[0].lon;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
           
            let tempMax = Math.floor((data.main.temp_max - 32)/1.8) + " Celsius";
            let tempMin = Math.floor((data.main.temp_min - 32)/1.8) + " Celsius";
            let termica = Math.floor((data.main.feels_like - 32)/1.8) + " Celsius";
            let humedad = data.main.humidity;
            let presion = data.main.pressure;
            let velocidadViento = data.wind.speed; 
            let clima = data.weather[0].main;

            elementoDatos.innerHTML = `
                <p>Temperatura máxima: ${tempMax}</p>
                <p>Temperatura mínima: ${tempMin}</p>
                <p>Humedad: ${humedad}%</p>
                <p>Sensación térmica: ${termica}</p>
                <p>Presión atmosférica: ${presion}</p>
                <p>Viento a: ${velocidadViento} km/h</p>
            `
           
            if(clima == "Clouds"){
            container.classList.remove("clear","rain","snow");
            container.classList.add("clouds");
          
            }if(clima == "Clear"){  
                container.classList.remove("clouds","rain","snow");
                container.classList.add("clear");
            }
            if(clima == "Rain"){
                container.classList.remove("clouds","clear","snow");
                container.classList.add("rain");   
            }
            if(clima == "Snow"){
                container.classList.remove("clouds","clear", "rain");
                container.classList.add("snow");   
            }
            console.log(clima)

        })

     
    });
    
};
