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

function changePossession(dribbler) {
    newPossession(dribbler)
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
            turnover()         // you caused a turnover
            return             // possession over
        }

        you += currDribble
    }

    // console.log("click", click)
    // console.log("me", me, "you", you)
}

function shoot() {
    // if after 3 dribbles
        // YOU > ME by 10 or more points, 3 points scored by YOU
        // YOU > ME by 1 or more points, 2 points scored by YOU
        // If ME is negative, YOU get one point (ME committed a foul)
        // If YOU are negative, YOU committed a turnover
    if ( (you - me) >= 10 ) {
        youDisp.textContent = parseInt(youDisp.textContent) + 3
    } else if (you > me) {
        youDisp.textContent = parseInt(youDisp.textContent) + 2
    }
    // change in possession
}

function foul() {
    if (me < 0) {
        youDisp.textContent = parseInt(youDisp.textContent) + 1
    }
}

function turnover() {
    defend() // change of possession
}
     
// create a defend function --> opposite of dribble function i.e. ME has the ball now and YOU are defending
function defend() {
    const you = Math.floor( Math.random() * 61 ) - 10
    let me = 0

    for (let i = 0; i < 3; i++) {
        me += Math.floor( Math.random() * 31 ) - 5
    }

    if ( (me - you) >= 10 ) { // ME scores 3 points
        meDisp.textContent = parseInt(meDisp.textContent) + 3
    } else if (me > you) { // ME scores 2 points
        meDisp.textContent = parseInt(meDisp.textContent) + 2
    } else if (you < 0) { // YOU foul
        meDisp.textContent = parseInt(meDisp.textContent) + 1
    } else if (me < 0) { // ME causes turnover
        dribble()
    } else { // me < you --> change in possession
        dribble()
    }
}