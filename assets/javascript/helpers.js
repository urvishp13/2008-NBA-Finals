let you
let me
const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")
const newGameBtn = document.getElementById("new-game-btn")
const offenseBtns = document.getElementById("offense-btns")
const dribbleBtn = document.getElementById("dribble-btn")
const defendBtn = document.getElementById("defend-btn")

function newPossession(dribbler) {
    if (dribbler === "YOU") {
        you = givePossessionTo()
        me = putOnDefense()
    }
    else {
        me = givePossessionTo()
        you = putOnDefense()
    }
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

function foul(committer) {
    if (committer === "ME") { // if ME committed foul
        youDisp.textContent = Number(youDisp.textContent) + 1 // YOU are allowed to shoot free throws
    }
    changePossession(committer) // give the ball to foul committer after YOU shot free throws
}

function forcedShot() {
    // if after 3 dribbles
        // YOU > ME by 10, 3 points scored by YOU
        // YOU > ME by 1, 2 points scored by YOU
    // change possession after every shot, regardless of if YOU scored points
    if ( (you - me) >= 10 ) {
        youDisp.textContent = Number(youDisp.textContent) + 3
    } else if (you > me) {
        youDisp.textContent = Number(youDisp.textContent) + 2
    }
    // change in possession
    changePossession("ME")
}

// this shot can be done before 3 dribbles are completed
function shoot(num) {
    // get the probability of shot being successful
    const probability = Math.random()

    // if the probability > 0.5, shot is made. Increase YOUR score by num
    if (probability > 0.5) {
        youDisp.textContent = Number(youDisp.textContent) + num
    }

    // after shot taken, give the ball to ME
    changePossession("ME")

    replaceOffenseBtns()
}

// swap the buttons for defensive play
function replaceOffenseBtns() {
    // remove the offense buttons from the DOM and replace it with the DEFEND button
    offenseBtns.style.display = "none"
    defendBtn.style.display = "block"
}

function turnover(violator) {
    // change of possession
    if (violator === "YOU") {
        changePossession("ME") 
    } else {
        changePossession("YOU")
    }
}