//list both keys
let primaryAPIKey = '1a6c7a6c3f7fdbc36594145ead3beb48';
let backupAPIKey = 'feeb1e15933c3850daf212f6801a413c';

//function for city name input
function searchWeather() {
    let cityName = document.getElementById("cityNameInput").value.trim();
    if (cityName) {
        let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${primaryAPIKey}&units=imperial`;
        fetchWeatherData(apiURL);
    } else {
        alert("Please enter a city name.");
    }
}

//function for displaying weather using city name input
function displayWeatherData(data) {
    if (data && data.main && 'temp' in data.main && 'temp_min' in data.main && 'temp_max' in data.main && 'pressure' in data.main) {
        let city = data.name;
        let temp = data.main.temp;
        let minTemp = data.main.temp_min;
        let maxTemp = data.main.temp_max;
        let pressure = data.main.pressure;

        document.getElementById("city").innerHTML = `City: ${city}`;
        document.getElementById("temp").innerHTML = `Temperature: ${temp}°F`;
        document.getElementById("minTemp").innerHTML = `Min Temperature: ${minTemp}°F`;
        document.getElementById("maxTemp").innerHTML = `Max Temperature: ${maxTemp}°F`;
        document.getElementById("pressure").innerHTML = `Pressure: ${pressure} hPa`;
    } else {
        console.error('Weather data is incomplete or missing.');
        alert('Failed to fetch weather data. Please try again later.');
    }
    
}

//function for api keys
function fetchWeatherData(apiURL) {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data with primary API key, trying backup key:', error);
            //retry with backup API key
            let backupURL = apiURL.replace(primaryAPIKey, backupAPIKey);
            fetch(backupURL)
                .then(response => response.json())
                .then(data => {
                    displayWeatherData(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data with backup API key:', error);
                    alert('Failed to fetch weather data. Please try again later.');
                });
        });
}

//function for displaying weather using geolocation
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${primaryAPIKey}&units=imperial`;
            fetchWeatherData(apiURL);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

