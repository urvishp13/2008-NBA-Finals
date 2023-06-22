const timer = document.getElementById("timer")

// create a countdown timer that runs from 45 seconds to 0 seconds
clock = setInterval(countdown, 1000)

function countdown() {
    currentTime = Number(timer.textContent) - 1
    timer.textContent = currentTime.toLocaleString(undefined, {minimumIntegerDigits: 2})

    if (currentTime === 0) {
        clearInterval(clock)
    }
}