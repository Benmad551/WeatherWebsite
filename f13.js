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