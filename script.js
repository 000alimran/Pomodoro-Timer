// Add beep sound
const beepSound = new Audio('beep.mp3');

// Function to play sound
const playBeep = () => {
  beepSound.currentTime = 0; // Reset the audio to start
  beepSound.play(); // Play the beep sound
};

let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const updateTimerDisplay = () => {
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
};

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;
    playBeep(); // Play beep sound on start
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          alert("Time's up! Take a break!");
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateTimerDisplay();
    }, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(timer);
  isRunning = false;
  playBeep(); // Play beep sound on pause
};

const resetTimer = () => {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  playBeep(); // Play beep sound on reset
  updateTimerDisplay();
};

// Event Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Initial display
updateTimerDisplay();
