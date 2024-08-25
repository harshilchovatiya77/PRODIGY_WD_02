let startTime, updatedTime, difference, timerInterval;
let paused = true;
let laps = 0;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
    }
}

function pauseTimer() {
    paused = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    difference = 0;
    laps = 0;
    timeDisplay.textContent = "00:00:00.00";
    lapsContainer.innerHTML = '';
}

function lapTimer() {
    if (!paused) {
        laps++;
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap-item');
        lapElement.innerHTML = `<span>Lap ${laps}</span>: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        lapsContainer.scrollTop = lapsContainer.scrollHeight;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.textContent = formatTime(difference);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
