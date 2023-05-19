const API_KEY = "033ffc66c5177cc7178a59750e2932ce";
const URL = "http://api.openweathermap.org/geo/1.0/direct?";

const elementoBotonInput = document.getElementById("btnClima");
const elementoDatos = document.getElementById('datos');
const imgFondoClima = document.getElementById('container');
const enter = document.getElementById('inputClima');

// Los addEventListener...(click y enter)
elementoBotonInput.addEventListener("click", devolverClima);
enter.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        devolverClima ()
    }
});

function devolverClima (){

  let elementoInput = document.getElementById("inputClima").value;
console.log(elementoInput)
    
    fetch(`${URL}q=${elementoInput}&appid=${API_KEY}`) 
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        
        if(data.length == 0){
            alert("El dato ingresado no existe");
        }else{
            let latitud = data[0].lat;
            let longitud = data[0].lon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
           
            let tempMax = (data.main.temp_max - 273.15).toFixed(1) + "°C";
            let tempMin = Math.floor(data.main.temp_min - 273.15).toFixed(1) + "°C";
            let termica = Math.floor(data.main.feels_like - 273.15).toFixed(1) + "°C";
            let humedad = data.main.humidity;
            let presion = data.main.pressure;
            let velocidadViento = data.wind.speed; 
            let clima = data.weather[0].main;

            elementoDatos.innerHTML = `
                <h2 class="fs-4 text-uppercase p-2 fw-bolder">Temperatura en ${elementoInput}</h2>
                <p><span class="fw-bolder">Temperatura máxima:</span> ${tempMax}</p>
                <p><span class="fw-bolder">Temperatura mínima:</span> ${tempMin}</p>
                <p><span class="fw-bolder">Humedad:</span> ${humedad}%</p>
                <p><span class="fw-bolder">Sensación térmica:</span> ${termica}</p>
                <p><span class="fw-bolder">Presión atmosférica:</span> ${presion} hPa</p>
                <p><span class="fw-bolder">Viento a:</span> ${velocidadViento} km/h</p>
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

        }
    });
    
};
