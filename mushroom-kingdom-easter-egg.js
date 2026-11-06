let marioAudioContext;

function showMushroomKingdomEasterEgg() {
  document.getElementById("city").textContent = "🍄 Mushroom Kingdom";
  document.getElementById("temp").textContent = "Temperature: Warp Whistle Warm";
  document.getElementById("feelsLike").textContent = "Feels Like: 8-Bit Breezy";
  document.getElementById("humidity").textContent = "Humidity: 100% Coin Shine";
  document.getElementById("description").textContent = "Description: Mario 3 Warp Whistle Time!";
  document.getElementById("windSpeed").textContent = "Wind Speed: Whistle Warp Fast";
  document.getElementById("icon").src = "https://openweathermap.org/img/wn/01d.png";

  showMarioTornado();
  playWarpWhistleTheme();
}

function showMarioTornado() {
  const existingTornado = document.querySelector(".mario-tornado");
  if (existingTornado) {
    existingTornado.remove();
  }

  const tornado = document.createElement("div");
  tornado.className = "mario-tornado";
  tornado.textContent = "🌀🎵🌀";
  tornado.setAttribute("aria-hidden", "true");
  document.body.appendChild(tornado);
  tornado.addEventListener("animationend", () => tornado.remove(), { once: true });
}

function playWarpWhistleTheme() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!marioAudioContext) {
    marioAudioContext = new AudioContextClass();
  }

  if (marioAudioContext.state === "suspended") {
    marioAudioContext.resume();
  }

  const startTime = marioAudioContext.currentTime;
  const whistles = [
    { delay: 0, from: 1960, to: 988, duration: 0.28 },
    { delay: 0.35, from: 1760, to: 880, duration: 0.28 }
  ];

  whistles.forEach(({ delay, from, to, duration }) => {
    const toneStart = startTime + delay;
    const toneEnd = toneStart + duration;
    const oscillator = marioAudioContext.createOscillator();
    const gainNode = marioAudioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(from, toneStart);
    oscillator.frequency.exponentialRampToValueAtTime(to, toneEnd);

    gainNode.gain.setValueAtTime(0.0001, toneStart);
    gainNode.gain.exponentialRampToValueAtTime(0.22, toneStart + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, toneEnd);

    oscillator.connect(gainNode);
    gainNode.connect(marioAudioContext.destination);
    oscillator.start(toneStart);
    oscillator.stop(toneEnd);
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
