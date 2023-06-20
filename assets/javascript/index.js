let you = 0;
let me = 0;

const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")

// console.log(meDisp)


// create a start game function
function startGame() {
    /* first possession always is given to YOU (the player) */
    // give YOU a random number between -5 and 25 --> dribbling
    // you = Math.floor( Math.random() * 31 ) - 5
    // give ME (the computer) a random number between -10 and 50 --> defending
    // me = Math.floor( Math.random() * 61 ) - 10
    // YOU has 3 opportunities to score: call action function
}

// create an action function (for dribbling/defending)
function dribble() {
    me = Math.floor( Math.random() * 61 ) - 10
    // if YOU have ball, ME gets to stop you 3 times (defend), so YOU are dribbling
        // with each dribble, add one random number to ME (between -5 and 25)
    for (let i = 0; i < 3; i++) {
        you += Math.floor( Math.random() * 31 ) - 5
    }
    // if after 3 times
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
     