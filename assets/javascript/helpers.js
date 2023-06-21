let you
let me
const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")
const newGameBtn = document.getElementById("new-game-btn")
const offenseBtns = document.getElementById("offense-btns")
const dribbleBtn = document.getElementById("dribble-btn")
const defendBtn = document.getElementById("defend-btn")
const freeThrowBtn = document.getElementById("free-throw-btn")
const liveResults = document.getElementById("live-gameplay-results")
const possessionDisp = document.getElementById("possession")

function newPossession(dribbler) {
    if (dribbler === "YOU") {
        you = givePossessionTo()
        me = putOnDefense()
        possessionDisp.textContent = "YOU"
        replaceDefenseBtns() // put YOU on offense
    }
    else {
        me = givePossessionTo()
        you = putOnDefense()
        possessionDisp.textContent = "ME"
        replaceOffenseBtns() // put YOU on defense
    }
}

function givePossessionTo() {
    return 0
}

function putOnDefense() {
    // return Math.floor( Math.random() * 61 ) - 10
    return -1
}

function changePossession(newDribbler) {
    newPossession(newDribbler)
}

function forcedShot(shooter) {
    // if after 3 dribbles
        // YOU > ME by 10, 3 points scored by YOU
        // YOU > ME by 1, 2 points scored by YOU
    // change possession after every shot, regardless of if YOU scored points
    if (shooter === "YOU") {
        if ( (you - me) >= 10 ) {
            youDisp.textContent = Number(youDisp.textContent) + 3
        } else if (you > me) {
            youDisp.textContent = Number(youDisp.textContent) + 2
        }
        // change in possession
        changePossession("ME")
    } else {
        if ( (me - you) >= 10 ) {
            meDisp.textContent = Number(meDisp.textContent) + 3
        } else if (me > you) {
            meDisp.textContent = Number(meDisp.textContent) + 2
        }
        // change in possession
        changePossession("YOU")
    }
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
}

// swap the buttons for defensive play
function replaceOffenseBtns() {
    // remove the offense buttons from the DOM and replace it with the DEFEND button
    offenseBtns.style.display = "none"
    defendBtn.style.display = "block"
}

// swap the buttons for offensive play
function replaceDefenseBtns() {
    // remove the DEFEND button from the DOM and replace it with the offensive buttons
    defendBtn.style.display = "none"
    offenseBtns.style.display = "flex"
}

function turnover(committer) {
    liveResults.textContent = `${committer} turned the ball over.`
    // change of possession
    if (committer === "YOU") {
        changePossession("ME") 
    } else {
        changePossession("YOU")
    }
}

function foul(violator) {
    liveResults.textContent = `${violator} committed a foul.`
    if (violator === "ME") { // if ME committed foul
        // give YOU 2 free throw attempt
        freeThrowBtn.style.display = "block" // make the SHOOT FT button present
    } else { // YOU committed foul
        // give ME 2 free throw attempts
        shootFreeThrow("ME")
    }
}

let click = 0 // Used to count YOUR button clicks
function shootFreeThrow(shooter) {
    click++

    // get the probability of FT being successful
    const probability = Math.random()

    // if the probability > 0.5, FT is made. Increase shooter's score by 1
    if (probability > 0.5) {
        if (shooter === "YOU") {
            youDisp.textContent = Number(youDisp.textContent) + 1 // YOU are allowed to shoot free throws
        } else {
            meDisp.textContent = Number(meDisp.textContent) + 1 // YOU are allowed to shoot free throws
        }
        liveResults.textContent = `${shooter} made a free throw.`
    } else { // if probability < 0.5, FT is missed
        liveResults.textContent = `${shooter} missed the free throw attempt.`
    }
    
    if (click => 2) { // if 2 free throws have been shot
        click = 0 // reset SHOOT FT button click count for next time when allowed to shoot free throws
        
        // don't allow YOU/ME to shoot anymore free throws
        freeThrowBtn.style.display = "none" // free throws done --> remove SHOOT FT button
        // give the ball to foul violator after the shooter shot their free throws
        if (shooter === "YOU") {
            changePossession("ME")  // give ME the ball
            defendBtn.style.display = "block" // meaning YOU are back on defense
        } else {
            changePossession("YOU") // give YOU the ball
            offenseBtns.style.display = "flex" // meaning YOU have the ball again
        }
    } 

}