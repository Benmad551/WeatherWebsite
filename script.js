window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cityInput").focus();
});

async function getGeoLocation(city) {
  const apiKey = '3db7e3d8e95dfdabc841e3d6317f29f9';
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding Failed: ${response.status}`);
    }

    const result = await response.json();
    if (result.length === 0) {
      throw new Error("Location not found. Please check your spelling.");
    }
    const { lat, lon } = result[0];
    return { lat, lon};
}

async function getWeather(lat, lon, units) {
  const apiKey = '3db7e3d8e95dfdabc841e3d6317f29f9';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather Query Failed: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

async function getWeatherForLocation(city, units) {
    const { lat, lon } = await getGeoLocation(city);
    const weather = await getWeather(lat, lon, units);
    
    return {
      city: weather.name,
      country: weather.sys.country,
      temp: weather.main.temp,
      feelsLike: weather.main.feels_like,
      humidity: weather.main.humidity,
      description: weather.weather[0].description,
      icon: weather.weather[0].icon,
      windSpeed: weather.wind.speed,
    };
}

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    handleCityInput();
  }
});

function displayWeather(weatherData, units) {
  const weather = document.getElementById("weather");
  document.getElementById("city").textContent = `${weatherData.city}, ${weatherData.country}`;
  const tempUnit = units === "metric" ? "°C" : units === "standard" ? "K" : "°F";
  document.getElementById("temp").textContent = `Temperature: ${weatherData.temp} ${tempUnit}`;
  document.getElementById("feelsLike").textContent = `Feels Like: ${weatherData.feelsLike} ${tempUnit}`;
  document.getElementById("humidity").textContent = `Humidity: ${weatherData.humidity}%`;
  document.getElementById("description").textContent = `Description: ${weatherData.description}`;
  document.getElementById("windSpeed").textContent = `Wind Speed: ${weatherData.windSpeed} mph`;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}.png`;
  document.getElementById("icon").src = iconUrl;
  weather.classList.remove("hidden");
}


async function handleCityInput() {
  const weather = document.getElementById("weather");
  const weatherCard = document.getElementById("weatherCard");
  const city = document.getElementById("cityInput").value.trim();
  const units = document.getElementById("unitSelect").value;
  const errorMessage = document.getElementById("errorMessage");
  
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  if (!city) {
    errorMessage.textContent = "Please enter a Location name.";
    errorMessage.classList.remove("hidden");
    weather.classList.add("hidden");
    weatherCard.classList.remove("hidden");
    return;
  };

  try {
    const weatherData = await getWeatherForLocation(city, units);
    displayWeather(weatherData, units);
    weatherCard.classList.remove("hidden");

  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
    weather.classList.add("hidden");
    weatherCard.classList.remove("hidden");
  }
}