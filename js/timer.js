'use strict'

// Timer

function startTimer() {
    gStartTime = Date.now();
    gGameInterval = setInterval(timer, 100);
}

function timer() {
    var currTime = Date.now();
    var elTimer = document.querySelector('.timer');
    var time = currTime - gStartTime;
    var secondsPassed = (time / 1000).toFixed(3);
    elTimer.innerText = `Time: ${secondsPassed}`;
}

function resetTimer() {
    if (gGameInterval) {
        clearTimeout(gGameInterval);
    }
    var timer = document.querySelector('.timer');
    timer.innerText = 'Time : 00:00';
}

function stopTimer (){
clearInterval(gGameInterval);
}