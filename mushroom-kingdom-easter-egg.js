function showMushroomKingdomEasterEgg() {
  document.getElementById("city").textContent = "🍄 Mushroom Kingdom";
  document.getElementById("temp").textContent = "Temperature: Warp Pipe Warm";
  document.getElementById("feelsLike").textContent = "Feels Like: 1-Up Awesome";
  document.getElementById("humidity").textContent = "Humidity: 100% Coin Shine";
  document.getElementById("description").textContent = "Description: It's-a me, Mario!";
  document.getElementById("windSpeed").textContent = "Wind Speed: Koopa Kart Fast";
  document.getElementById("icon").src = "https://openweathermap.org/img/wn/01d.png";
}

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key !== "Enter") return;

  const city = event.target.value.trim().toLowerCase();
  if (city !== "mushroom kingdom") return;

  event.preventDefault();
  event.stopImmediatePropagation();
  showMushroomKingdomEasterEgg();
});
