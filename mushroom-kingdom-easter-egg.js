let marioAudioContext;

function showMushroomKingdomEasterEgg() {
  const weatherCard = document.getElementById("weatherCard");
  const errorMessage = document.getElementById("errorMessage");

  document.getElementById("city").textContent = "🍄 Mushroom Kingdom";
  document.getElementById("temp").textContent = "Temperature: Warp Pipe Warm";
  document.getElementById("feelsLike").textContent = "Feels Like: 1-Up Awesome";
  document.getElementById("humidity").textContent = "Humidity: 100% Coin Shine";
  document.getElementById("description").textContent = "Description: It's-a me, Mario!";
  document.getElementById("windSpeed").textContent = "Wind Speed: Koopa Kart Fast";
  document.getElementById("icon").src = "https://openweathermap.org/img/wn/01d.png";

  showMarioTornado();
  playMarioThemeJingle();
  weatherCard.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function showMarioTornado() {
  const existingTornado = document.querySelector(".mario-tornado");
  if (existingTornado) {
    existingTornado.remove();
  }

  const tornado = document.createElement("div");
  tornado.className = "mario-tornado";
  tornado.textContent = "🌀🍄🌀";
  tornado.setAttribute("aria-hidden", "true");
  document.body.appendChild(tornado);
  tornado.addEventListener("animationend", () => tornado.remove(), { once: true });
}

function playMarioThemeJingle() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!marioAudioContext) {
    marioAudioContext = new AudioContextClass();
  }

  if (marioAudioContext.state === "suspended") {
    marioAudioContext.resume();
  }

  const notes = [
    { frequency: 659.25, duration: 0.12 },
    { frequency: 659.25, duration: 0.12 },
    { frequency: 0, duration: 0.08 },
    { frequency: 659.25, duration: 0.12 },
    { frequency: 0, duration: 0.08 },
    { frequency: 523.25, duration: 0.12 },
    { frequency: 659.25, duration: 0.12 },
    { frequency: 0, duration: 0.08 },
    { frequency: 783.99, duration: 0.2 }
  ];

  let currentTime = marioAudioContext.currentTime;

  notes.forEach(({ frequency, duration }) => {
    if (frequency === 0) {
      currentTime += duration;
      return;
    }

    const oscillator = marioAudioContext.createOscillator();
    const gainNode = marioAudioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, currentTime);
    gainNode.gain.setValueAtTime(0.0001, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.25, currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(marioAudioContext.destination);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);

    currentTime += duration;
  });
}

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key !== "Enter") return;

  const city = event.target.value.trim().toLowerCase();
  if (city !== "mushroom kingdom") return;

  event.preventDefault();
  event.stopImmediatePropagation();
  showMushroomKingdomEasterEgg();
});
