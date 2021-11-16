const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onColorRandomizerStart() {
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');

  randomizerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onColorRandomizerStop() {
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
  clearInterval(randomizerID);
}

stopButton.setAttribute('disabled', true);

startButton.addEventListener("click", onColorRandomizerStart);
stopButton.addEventListener("click", onColorRandomizerStop);

