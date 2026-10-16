require('dotenv').config();
async function getGeoLocation(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding Failed: ${response.status}`);
    }

    const result = await response.json();
    const { lat, lon } = result[0];
    return { lat, lon};
  } catch (error) {
    console.error(error.message);
  }
}

async function getWeather(lat, lon) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather Query Failed: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getWeatherForLocation(city) {
  try {
    const { lat, lon } = await getGeoLocation(city);
    const weather = await getWeather(lat, lon);
    console.log(weather);
  } catch (error) {
    console.error(error.message);
  }
}

getWeatherForLocation("Louisville");