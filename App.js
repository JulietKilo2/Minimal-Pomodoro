/************
DOM variables 
************/

// Timer buttons
const displayTimer = document.querySelector(".timer");
const startBtn = document.querySelector(".fa-play-circle");
const pauseBtn = document.querySelector(".fa-pause-circle");
const resetBtn = document.querySelector(".fa-stop-circle");

// Session options
const setPomodoro = document.querySelector("#time-pomodoro");
const setShortBreak = document.querySelector("#time-short-break");
const setLongBreak = document.querySelector("#time-long-break");


// Default time settings
const timeSetting = [
    {
        name: 'pomodoro',
        min: 25,
        sec: 00
    },
    {
        name: 'longBreak',
        min: 15,
        sec: 00
    },
    {
        name: 'shortBreak',
        min: 0,
        sec: 3
    },
]

// Global variaables
const capturedTimeValue = { min: 25, sec: 0 };
const copiedTimeValue = { min: capturedTimeValue.min, sec: capturedTimeValue.sec };
const userRecords = [];


/************
Functions
************/

const timeManager = (setting) => {
    let min;
    let sec;
    if (setting == 'pomodoro') {
        min = parseInt(timeSetting[0].min);
        sec = parseInt(timeSetting[0].sec);
    }
    if (setting == 'longBreak') {
        min = parseInt(timeSetting[1].min);
        sec = parseInt(timeSetting[1].sec);
    }
    if (setting == 'shortBreak') {
        min = parseInt(timeSetting[2].min);
        sec = parseInt(timeSetting[2].sec);
    }
    displayTime(min, sec);
    capturedTimeValue.min = min;
    capturedTimeValue.sec = sec;
    copiedTimeValue.min = min;
    copiedTimeValue.sec = sec;
    console.log(capturedTimeValue);
};

const displayTime = (min, sec) => {
    if (min < 10) {
        min = `0${min}`
    }
    if (sec < 10) {
        sec = `0${sec}`
    }
    displayTimer.textContent = `${min}:${sec}`

    document.title = `In Session (${min}:${sec})`
}

const startTimer = function () {
    console.log('started')
    startBtn.removeEventListener("click", startTimer)
    const catchme = setInterval(function () {
        if (capturedTimeValue.min !== 0 && capturedTimeValue.sec == 0) {
            capturedTimeValue.sec = 59;
            capturedTimeValue.min = capturedTimeValue.min - 1;
            displayTime(capturedTimeValue.min, capturedTimeValue.sec)
        } else if (capturedTimeValue.min == 0 && capturedTimeValue.sec == 0) {
            console.log("job's done")
            displayTimer.innerHTML = "<h1>Session completed.</h1>"
            document.title = `Session Completed`;
            clearInterval(catchme)
        } else {
            capturedTimeValue.sec = capturedTimeValue.sec - 1;
            displayTime(capturedTimeValue.min, capturedTimeValue.sec)
        }
        console.log(capturedTimeValue.min, capturedTimeValue.sec)
        // displayTime(capturedTimeValue.min, capturedTimeValue.sec)
    }, 1000);
    pauseBtn.addEventListener("click", () => {
        console.log('paused')
        clearInterval(catchme);
        startBtn.addEventListener("click", startTimer)
    })
    resetBtn.addEventListener("click", () => {
        console.log('reset')
        clearInterval(catchme)
        displayTime(copiedTimeValue.min, copiedTimeValue.sec);
        capturedTimeValue.min = copiedTimeValue.min;
        capturedTimeValue.sec = copiedTimeValue.sec;
        startBtn.addEventListener("click", startTimer)
    })
    setPomodoro.addEventListener("click", function () {
        clearInterval(catchme);
        timeManager('pomodoro');
        startBtn.addEventListener("click", startTimer)
    });
    setLongBreak.addEventListener("click", function () {
        clearInterval(catchme);
        timeManager('longBreak')
        startBtn.addEventListener("click", startTimer)

    });
    setShortBreak.addEventListener("click", function () {
        clearInterval(catchme);
        timeManager('shortBreak')
        startBtn.addEventListener("click", startTimer)

    });

}

/*************************
Attach event listners here
**************************/

startBtn.addEventListener("click", startTimer)
// resetBtn.addEventListener("click", () => {
//     clearInterval(catchme)
//     displayTime(copiedTimeValue.min, copiedTimeValue.sec);
//     capturedTimeValue.min = copiedTimeValue.min;
//     capturedTimeValue.sec = copiedTimeValue.sec;
// })
setPomodoro.addEventListener("click", function () {
    timeManager('pomodoro');
});
setLongBreak.addEventListener("click", function () {
    timeManager('longBreak')
});
setShortBreak.addEventListener("click", function () {
    timeManager('shortBreak')
});

// Default settings
// displayTime(timeSetting[0].min, timeSetting[0].sec)

