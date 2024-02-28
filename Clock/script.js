const clockContainer = document.getElementById("clockContainer");

const clockBtn = document.getElementById("clockBtn");
const worldclockBtn = document.getElementById("worldclockBtn");
const stopwatchBtn = document.getElementById("stopwatchBtn");
const timerBtn = document.getElementById("timerBtn");
const reminderBtn = document.getElementById("reminderBtn");
const hiddenDiv = document.querySelector(".hiddenDiv");


clockBtn.addEventListener('click', () => {
    worldClockContainer.style.display = 'none';
    countDownContainer.style.display = 'none';
    stopwatchContainer.style.display = 'none';
});

worldclockBtn.addEventListener('click', () => {
    worldClockContainer.style.display = 'flex';
    worldClockContainer.style.justifyContent = 'space-around';
    worldClockContainer.style.alignItems = 'center';

    countDownContainer.style.display = 'none';
    stopwatchContainer.style.display = 'none';
});

stopwatchBtn.addEventListener('click', () => {
    stopwatchContainer.style.display = 'flex';
    stopwatchContainer.style.flexDirection = 'column';
    stopwatchContainer.style.justifyContent = 'center';
    stopwatchContainer.style.alignItems = 'center';

    countDownContainer.style.display = 'none';
    worldClockContainer.style.display = 'none';
});

timerBtn.addEventListener('click', () => {
    countDownContainer.style.display = 'flex';
    countDownContainer.style.justifyContent = 'center';
    countDownContainer.style.alignItems = 'center';

    stopwatchContainer.style.display = 'none';
    worldClockContainer.style.display = 'none';
});

//         <!-- ====================Clock==================== -->

const tlvTime = () => {
    const mainCurrentTime = new Date().toLocaleString('en-US', { timeStyle: 'medium', hourCycle: 'h24' });
    clockContainer.innerText = mainCurrentTime;
}

setInterval(tlvTime, 1000);


//        <!-- ====================worldClock==================== -->

const worldClockContainer = document.getElementById("worldClockContainer");
const worldClockMain = document.getElementById('worldClockMain');
const worldClockDisplay = document.querySelector(".worldClock-display");
const select = document.getElementById('worldClockSelect');
const currentTime = document.getElementById('currentTime');

const displayTime = () => {
    // When displayTime is called, the selected time zone is set
    const timeZoneName = select.value;
    const options = { timeZone: timeZoneName, timeStyle: 'medium', hourCycle: 'h24' };

    // Create a Date object with the selected time zone
    const currentTimeInTimeZone = new Date().toLocaleString('en-US', options);

    // Update the text in <h2>
    currentTime.innerText = currentTimeInTimeZone;
}

// Initial call to displayTime to display the initial time
displayTime();
setInterval(displayTime, 1000);


let clockCount = 1;

function duplicateClock() {
    const originalClock = document.getElementById("worldClock0");

    const newClock = originalClock.cloneNode(true);
    newClock.id = "worldClock" + clockCount;

    const select = newClock.querySelector("select");
    const timeDisplay = newClock.querySelector('.worldClock-display');

    function displayTime() {
        const timeZoneName = select.value;
        const options = { timeZone: timeZoneName, timeStyle: 'medium', hourCycle: 'h24' };
        const currentTimeInTimeZone = new Date().toLocaleString('en-US', options);
        timeDisplay.innerText = currentTimeInTimeZone;
    }

    displayTime();

    setInterval(displayTime, 1000);
    worldClockMain.appendChild(newClock);
    clockCount++;
}

function updateTimeZone(select) {
    displayTime();

    function displayTime() {
        const timeZoneName = select.value;
        const options = { timeZone: timeZoneName, timeStyle: 'medium', hourCycle: 'h24' };
        const currentTimeInTimeZone = new Date().toLocaleString('en-US', options);
        worldClockDisplay.innerText = currentTimeInTimeZone;
    }
}

//        <!-- ====================stopWatch==================== -->

const stopwatchContainer = document.getElementById("stopwatchContainer");
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector('.stopwatch-display');
let int = null;

document.getElementById('startBtn').addEventListener('click', () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    clearInterval(int);

});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(int);

    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000"
});

function displayTimer() {

    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;

            if (minutes == 60) {
                minutes = 0;
                hours++
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms =
        milliseconds < 10
            ? "00" + milliseconds
            : milliseconds < 100
                ? '0' + milliseconds
                : milliseconds;

    timeRef.innerHTML = `${h}:${m}:${s}:${ms}`;
}


//        <!-- ====================countDownTimer==================== -->

const countDownContainer = document.getElementById("countDownContainer");
const countDownStart = document.getElementById('countDownStartBtn');
const countDownReset = document.getElementById('countDownResetBtn');
const h = document.getElementById('hour');
const m = document.getElementById('minute');
const s = document.getElementById('sec');

// store a reference to the variable
let startTimer = null;

function timer() {
    if (h.value == 0 && m.value == 0 && s.value == 0) {

        h.value = '00';
        m.value = '00';
        s.value = '00'

    } else if (s.value != 0) {
        s.value--;

    } else if (m.value != 0 && s.value == 0) {
        s.value = 59;
        m.value--;

    } else if (h.value != 0 && m.value == 0) {
        m.value = 60;
        h.value--;
    }
    return;
}

function stopTimer() {
    clearInterval(startTimer);
}

countDownStart.addEventListener('click', function () {
    // initialize the variable startTimer
    function startInterval() {
        startTimer = setInterval(function () {
            timer();
        }, 1000);
    }
    startInterval();
})

countDownReset.addEventListener('click', function () {
    h.value = '00';
    m.value = '00';
    s.value = '00';
    stopTimer()
})




