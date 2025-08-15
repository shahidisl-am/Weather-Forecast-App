const apiKey = "2066e80499d255f1e78ab8753935598c";

function getWeather() {
    const city = document.getElementById('cityInput').value || 'Hasilpur';
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}° ${getWeatherEmoji(data.weather[0].main)}`;
            document.getElementById('condition').textContent = data.weather[0].main;
            document.getElementById('description').textContent = data.weather[0].description + ` ${getWeatherEmoji(data.weather[0].main)}`;
            document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind').textContent = `${Math.round(data.wind.speed)} m/s`;
            document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed)} mph`;
            document.getElementById('windDirection').textContent = data.wind.deg ? getWindDirection(data.wind.deg) : 'N';

            // Hourly forecast (simplified, using current data for demo)
            const hourlyForecast = document.getElementById('hourlyForecast');
            hourlyForecast.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                hourlyForecast.innerHTML += `<div>${new Date().getHours() + i}:00 <span>${Math.round(data.main.temp)}° ${getWeatherEmoji(data.weather[0].main)}</span></div>`;
            }

            // Daily forecast (simplified, using current data for demo)
            const dailyForecast = document.getElementById('dailyForecast');
            dailyForecast.innerHTML = '';
            const days = ['Today', 'Sun', 'Mon', 'Tue', 'Wed'];
            days.forEach(day => {
                dailyForecast.innerHTML += `<div>${day} <span>${Math.round(data.main.temp)}° ${getWeatherEmoji(data.weather[0].main)}</span></div>`;
            });

            document.getElementById('uvIndex').textContent = '3'; // Placeholder, API requires extra call for UV
        })
        .catch(error => alert('City not found or API error'));
}

function getWeatherEmoji(condition) {
    const emojis = {
        'Rain': '🌧️',
        'Clouds': '☁️',
        'Clear': '☀️',
        'Snow': '❄️',
        'Thunderstorm': '⛈️',
        'Drizzle': '🌦️',
        'Mist': '🌫️'
    };
    return emojis[condition] || '🌡️';
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// Initial load with default city
getWeather();