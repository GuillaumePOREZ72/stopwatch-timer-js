const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

const lapList = document.getElementById("laps-list");

// stopwatch variables

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

if (startButton) startButton.addEventListener("click", startTimer);
if (stopButton) stopButton.addEventListener("click", stopTimer);
if (pauseButton) pauseButton.addEventListener("click", pauseTimer);
if (resetButton) resetButton.addEventListener("click", resetTimer);

function startTimer() {
  if (startButton) {
    interval = setInterval(updateTimer, 10);
    startButton.setAttribute("disabled", "");
  }
}

function stopTimer() {
  clearInterval(interval);
  addToLapList();
  resetTimerData();
  if (startButton) startButton.removeAttribute("disabled");
}

function pauseTimer() {
  clearInterval(interval);
  if (startButton) startButton.removeAttribute("disabled");
}

function resetTimer() {
  clearInterval(interval);
  resetTimerData();
  if (startButton) startButton.removeAttribute("disabled");
}

function updateTimer() {
  milliseconds++;

  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }

  displayTimer();
}

function displayTimer() {
  console.log(millisecondsLabel, minutesLabel, secondsLabel);
  if (millisecondsLabel && secondsLabel && minutesLabel) {
    minutesLabel.textContent = `${padTime(minutes)} :`;
    secondsLabel.textContent = `${padTime(seconds)} :`;
    millisecondsLabel.textContent = padTime(milliseconds);
  }
}

/**
 * @param {number} time
 */
function padTime(time) {
  return time.toString().padStart(2, "0");
}

function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
}

function addToLapList() {
  const laptime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    milliseconds
  )}`;

  if (lapList) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>Lap ${
      lapList.childElementCount + 1
    }: </span>${laptime}`;
    lapList.appendChild(listItem);
  }
}
