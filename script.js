async function getGeoLocation(city) {
  const apiKey = '3db7e3d8e95dfdabc841e3d6317f29f9';
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding Failed: ${response.status}`);
    }

    const result = await response.json();
    const { lat, lon } = result[0];
    return { lat, lon};
  } catch (error) {
    throw error;
  }
}

async function getWeather(lat, lon) {
  const apiKey = '3db7e3d8e95dfdabc841e3d6317f29f9';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather Query Failed: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

async function getWeatherForLocation(city) {
  try {
    const { lat, lon } = await getGeoLocation(city);
    const weather = await getWeather(lat, lon);
    
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

  } catch (error) {
    throw error;
  }
}

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    handleCityInput();
  }
});

const easterEggOverlay = document.getElementById("f13EasterEgg");
const closeEggButton = document.getElementById("closeF13Egg");
const versionTag = document.getElementById("versionTag");
let versionClickCount = 0;

function showF13EasterEgg() {
  easterEggOverlay.classList.add("show");
  easterEggOverlay.setAttribute("aria-hidden", "false");
}

function hideF13EasterEgg() {
  easterEggOverlay.classList.remove("show");
  easterEggOverlay.setAttribute("aria-hidden", "true");
}

versionTag.addEventListener("click", function() {
  versionClickCount += 1;
  if (versionClickCount === 13) {
    showF13EasterEgg();
    versionClickCount = 0;
  }
});

closeEggButton.addEventListener("click", hideF13EasterEgg);

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && easterEggOverlay.classList.contains("show")) {
    hideF13EasterEgg();
  }
});

function displayWeather(weatherData) {
  document.getElementById("city").textContent = `${weatherData.city}, ${weatherData.country}`;
  document.getElementById("temp").textContent = `Temperature: ${weatherData.temp} °F`;
  document.getElementById("feelsLike").textContent = `Feels Like: ${weatherData.feelsLike} °F`;
  document.getElementById("humidity").textContent = `Humidity: ${weatherData.humidity}%`;
  document.getElementById("description").textContent = `Description: ${weatherData.description}`;
  document.getElementById("windSpeed").textContent = `Wind Speed: ${weatherData.windSpeed} mph`;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}.png`;
  document.getElementById("icon").src = iconUrl;
}


async function handleCityInput() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) return;

  try {
    const weatherData = await getWeatherForLocation(city);
    displayWeather(weatherData);

  } catch (error) {
    throw error;
  }
}