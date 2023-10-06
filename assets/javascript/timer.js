const timer = document.getElementById("time")
const newGameBtn = document.getElementById("new-game-btn")

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
        stopFreeThrows()

        // reset the timer
        timer.textContent = "45"

        // if the 4th period is over, allow the option to start a new game
        if (periodCounter.textContent == 4) { // (unstrict equality to compare string of 4 to number 4---just easier)
            newGameBtn.style.display = "block"
            periodCounter.textContent = "0"
            return
        }

        // allow functionality to start the next period
        startPeriodBtn.style.display = "block"
    }
}