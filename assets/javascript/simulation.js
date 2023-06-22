let you
let me
const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")
const offenseBtns = document.getElementById("offense-btns")
const dribbleBtn = document.getElementById("dribble-btn")
const defendBtn = document.getElementById("defend-btn")
const freeThrowBtn = document.getElementById("free-throw-btn")
const liveResults = document.getElementById("live-gameplay-results")
const possessionDisp = document.getElementById("possession")
const foulOnDisp = document.getElementById("foul-on")

function newPossession(dribbler) {
    if (dribbler === "YOU") {
        me = putOnDefense()

        // put YOU on offense
        you = givePossessionTo()
        beginOffensivePlay() 
        stopDefensivePlay()

        liveResults.textContent = `YOU are dribbling the ball.`
    }
    else {
        me = givePossessionTo()

        // put YOU on defense
        you = putOnDefense()
        beginDefensivePlay()
        stopOffensivePlay()

        liveResults.textContent = `ME is dribbling the ball.`
    }

    possessionDisp.textContent = dribbler

    // clear the foul display now (indicates foul on previous drive)
    foulOnDisp.textContent = ""
}

function givePossessionTo() {
    return 0
}

function putOnDefense() {
    return Math.floor( Math.random() * 61 ) - 10
}

function changePossession(newDribbler) {
    newPossession(newDribbler)
}

function forcedShot(shooter) {
    // if after 3 dribbles
        // YOU > ME by 10, 3 points scored by YOU
        // YOU > ME by 1, 2 points scored by YOU
        // change possession after every shot, regardless of if YOU scored points
    // else, vice versa
    let pointsScored = 0
    if (shooter === "YOU") {
        if ( (you - me) >= 20 ) {
            youDisp.textContent = Number(youDisp.textContent) + 3
            pointsScored = 3
        } else if (you > me) {
            youDisp.textContent = Number(youDisp.textContent) + 2
            pointsScored = 2
        }
        // change in possession
        changePossession("ME")

        pointsScored != 0 ? liveResults.textContent = `YOU scored ${pointsScored} points! ${liveResults.textContent}` : ""
    } else {
        if ( (me - you) >= 20 ) {
            meDisp.textContent = Number(meDisp.textContent) + 3
            pointsScored = 3
        } else if (me > you) {
            meDisp.textContent = Number(meDisp.textContent) + 2
            pointsScored = 2
        }
        // change in possession
        changePossession("YOU")
        
        pointsScored != 0 ? liveResults.textContent = `ME scored ${pointsScored} points! ${liveResults.textContent}` : ""
    }
}

function beginOffensivePlay() {
    offenseBtns.style.display = "flex"
}

function stopOffensivePlay() {
    offenseBtns.style.display = "none"
}

function beginDefensivePlay() {
    defendBtn.style.display = "block"
}

function stopDefensivePlay() {
    defendBtn.style.display = "none"
}

function stopFreeThrows() {
    freeThrowBtn.style.display = "none"
}

function turnover(committer) {
    // change of possession
    if (committer === "YOU") {
        changePossession("ME") 
    } else {
        changePossession("YOU")
    }
    liveResults.textContent = `${committer} turned the ball over. ${liveResults.textContent}`
}

function foul(violator) {
    foulOnDisp.textContent = violator
    if (violator === "ME") { // if ME committed foul
        // give YOU 2 free throw attempts
        freeThrowBtn.style.display = "block" // make the SHOOT FT button present
    } else { // YOU committed foul
        // give ME 2 free throw attempts
        for (let shot = 1; shot <= 2; shot++) {
            shootFreeThrow("ME")
        }
    }
    liveResults.textContent = `${violator} committed a foul. 
    ${violator === "ME" 
    ? "YOU are shooting free throws." 
    : "ME shot free throws."}
    `
}