let you
let me

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

function shoot() {
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

function turnover(violator) {
    // change of possession
    if (violator === "YOU") {
        changePossession("ME") 
    } else {
        changePossession("YOU")
    }
}