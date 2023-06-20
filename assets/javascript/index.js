let you
let me
const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")

// console.log(meDisp)


// create a start game function
function startGame() {
    /* first possession always is given to YOU (the game player), hence why only dribble button (and not defend) button 
       is displayed */
    youDisp.textContent = 0
    meDisp.textContent = 0

    newPossession("YOU")
}

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

let click = 0
// create a dribble function 
function dribble() {
    // YOU have ball, so ME gets to stop you 3 times (defend) aka YOU get to dribble 3 times to score
    // with each dribble (click of button), add one random number to YOU (between -5 and 25)
    click++ // function ran, so one dribble recorded
    if (click <= 3) {
        const currDribble = Math.floor( Math.random() * 31 ) - 5

        if (currDribble < 0) { // if YOU randomly get a negative number of this dribble
            turnover("YOU")         // YOU caused a turnover
            return             // possession over
        }

        you += currDribble
    }

    // if ME committed a foul while YOU were dribbling
    if (me < 0) {
        // change possession --> give ME the ball after YOU shoots free throws
        foul("ME")
        changePossession("ME")
    }

    // if YOU dribbled 3 times, YOU have to shoot
    if (click === 3) {
        shoot()
    }
}

function foul(committer) {
    if (committer === "ME") {
        youDisp.textContent = Number(youDisp.textContent) + 1
    }
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
     
// // create a defend function --> opposite of dribble function i.e. ME has the ball now and YOU are defending
// function defend() {
//     const you = Math.floor( Math.random() * 61 ) - 10
//     let me = 0

//     for (let i = 0; i < 3; i++) {
//         me += Math.floor( Math.random() * 31 ) - 5
//     }

//     if ( (me - you) >= 10 ) { // ME scores 3 points
//         meDisp.textContent = Number(meDisp.textContent) + 3
//     } else if (me > you) { // ME scores 2 points
//         meDisp.textContent = Number(meDisp.textContent) + 2
//     } else if (you < 0) { // YOU foul
//         meDisp.textContent = Number(meDisp.textContent) + 1
//     } else if (me < 0) { // ME causes turnover
//         dribble()
//     } else { // me < you --> change in possession
//         dribble()
//     }
// }