const userFormEl = document.querySelector("#user-form");
const cityInputEl = document.querySelector("#city");
const weatherDataContainerEl = document.querySelector("#weather-data");
const citySearchTerm = document.querySelector("#city-search-term");

const apiKey = '3838a80f237106562ee88bbacb350f81'

const getWeatherCity = (citySelected) => {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${citySelected}&appid=${apiKey}`

    // exclude -- &exclude=${part}

    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                var currentWeatherEl = document.createElement("h2");
                currentWeatherEl.textContent = data[0].name
                weatherDataContainerEl.classList.add('weather-data');
                weatherDataContainerEl.append(currentWeatherEl);
            })
        } else {
            alert('Error: Weather Data Not Found');
          }
    }).catch(function(error) {
        alert("Unable to get weather data");
      });
}

const getCityCoords = (city) => {
    
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    // exclude -- &exclude=${part}

    fetch(apiUrl).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
            var citySelected = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`
            
            displayWeatherData(citySelected)
            })
            } else {
            alert('Error: Weather Data Not Found');
            }
    }).catch(function(error) {
        alert("Unable to get weather data");
      });
}


const formSubmitHandler = function(event) {
    event.preventDefault();
  
    // get value from input element
    const citySelected = cityInputEl.value.trim();
  
    if (citySelected) {
        console.log(citySelected);
      getWeatherCity(citySelected);
      getCityCoords(citySelected);
      cityInputEl.value = "";
    } else {
    alert("Please enter a city");
    }
  };

const displayWeatherData = (citySelected) => {
    fetch(citySelected).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
         console.log(data.current.temp)
            const currentTempEl = document.createElement("p")
            currentTempEl.textContent = `Temperature: ${data.current.temp}`
            weatherDataContainerEl.append(currentTempEl)
            })
            } else {
            alert('Error: Weather Data Not Found');
            }
    }).catch(function(error) {
        alert("Unable to get weather data");
      });
    
}

userFormEl.addEventListener("submit", function() {
    formSubmitHandler(event)
})
