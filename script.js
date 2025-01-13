// Add beep sound
const beepSound = new Audio('beep.mp3');

// Function to play sound
const playBeep = () => {
  beepSound.currentTime = 0; // Reset the audio to start
  beepSound.play(); // Play the beep sound
};

// Timer variables
let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

// Progress ring variables
const progressCircle = document.querySelector('.progress-ring__circle');
const radius = 50; // Radius of the circle
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

// Function to update the timer display
const updateTimerDisplay = () => {
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
};

// Function to update the progress circle
const updateProgressCircle = () => {
  const totalSeconds = 25 * 60; // Total time in seconds (25 minutes)
  const elapsedSeconds = (25 - minutes) * 60 + (60 - seconds);
  const progress = elapsedSeconds / totalSeconds;
  const offset = circumference - progress * circumference;

  progressCircle.style.strokeDashoffset = offset;
};

// Function to start the timer
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
      updateProgressCircle();
    }, 1000);
  }
};

// Function to pause the timer
const pauseTimer = () => {
  clearInterval(timer);
  isRunning = false;
  playBeep(); // Play beep sound on pause
};

// Function to reset the timer
const resetTimer = () => {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  playBeep(); // Play beep sound on reset
  updateTimerDisplay();
  progressCircle.style.strokeDashoffset = `${circumference}`; // Reset the progress bar
};

// Event listeners for buttons
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Initial display setup
updateTimerDisplay();
