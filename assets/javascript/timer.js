const timer = document.getElementById("timer")

// create a countdown timer that runs from 45 seconds to 0 seconds
function countdown() {
    currentTime = Number(timer.textContent) - 1
    timer.textContent = currentTime.toLocaleString(undefined, {minimumIntegerDigits: 2})

    // when the clock hits 0 seconds
    if (currentTime === 0) {
        clearInterval(clock)
        // stop all play
        stopOffensivePlay()
        stopDefensivePlay()
        // allow functionality to start the next period
        startPeriodBtn.style.display = "block"
        // reset the timer
        timer.textContent = "15"
    }
}