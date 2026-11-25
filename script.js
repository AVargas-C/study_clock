let totalMilliseconds = 0;
let isRunning = false;
let intervalId = null;
let startTime = 0;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);

    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
}

function tick() {
    const now = Date.now();
    totalMilliseconds += now - startTime;
    startTime = now;
    updateDisplay();
}

function play() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        intervalId = setInterval(tick, 100);
        playPauseBtn.textContent = 'Pause';
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        playPauseBtn.textContent = 'Play';
    }
}

function reset() {
    isRunning = false;
    clearInterval(intervalId);
    totalMilliseconds = 0;
    updateDisplay();
    playPauseBtn.textContent = 'Play';
}

playPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pause();
    } else {
        play();
    }
});

resetBtn.addEventListener('click', reset);

updateDisplay();
