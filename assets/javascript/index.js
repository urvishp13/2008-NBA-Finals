const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")

// console.log(meDisp)


// create a start game function
function startGame() {
    /* first possession always is given to YOU (the game player) */
    dribble()
}

// create a dribble function 
function dribble() {
    const me = Math.floor( Math.random() * 61 ) - 10
    let you = 0
    
    // if YOU have ball, ME gets to stop you 3 times (defend), so YOU are dribbling
        // with each dribble, add one random number to ME (between -5 and 25)
    for (let i = 0; i < 3; i++) {
        you += Math.floor( Math.random() * 31 ) - 5
    }

    // if after 3 dribbles
        // YOU > ME by 10 or more points, 3 points scored by YOU
        // YOU > ME by 1 or more points, 2 points scored by YOU
        // If ME is negative, YOU get one point (ME committed a foul)
        // If YOU are negative, YOU committed a turnover
    if ( (you - me) >= 10 ) {
        youDisp.textContent = parseInt(youDisp.textContent) + 3
    } else if (you > me) {
        youDisp.textContent = parseInt(youDisp.textContent) + 2
    } else if (me < 0) {
        youDisp.textContent = parseInt(youDisp.textContent) + 1
    } else if (you < 0) {
        defend()
    } else { // you < me --> change in possession
        defend()
    }
}
     
// create a defend function --> opposite of dribble function i.e. ME has the ball now and YOU are defending
function dribble() {
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