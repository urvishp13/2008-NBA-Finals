const youDisp = document.getElementById("you-points")
const meDisp = document.getElementById("me-points")
const newGameBtn = document.querySelector(".new-game-btn")
const offenseBtns = document.querySelector(".offense-btns")
const defendBtn = document.querySelector(".defend-btn")

// console.log(meDisp)


// create a start game function
function startGame() {
    /* first possession always is given to YOU (the game player), hence why only dribble button (and not defend) button 
       is displayed */
    youDisp.textContent = 0
    meDisp.textContent = 0

    newPossession("YOU")

    // make the NEW GAME button disappear
    newGameBtn.style.display = "none"
    // make the offensive buttons appear
    offenseBtns.style.display = "flex"
}

let click = 0
// create a dribble function 
function dribble() {
    // YOU have ball, so ME gets to stop you 3 times (defend) aka YOU get to dribble 3 times to score
    // with each dribble (click of button), add one random number to YOU (between -5 and 25)
    
    click++ // function ran, so one DRIBBLE button click counted

    const currDribble = Math.floor( Math.random() * 31 ) - 5

    if (currDribble < 0) { // if YOU randomly get a negative number of this dribble
        turnover("YOU")    // YOU caused a turnover
        return             // possession over
    }

    you += currDribble

    console.log("click", click, ", me", me, ", you", you)

    // if ME committed a foul while YOU were dribbling
    if (me < 0) {
        foul("ME")
        return
    }

    // if YOU dribbled 3 times, YOU have to shoot
    if (click === 3) {
        shoot()
        click = 0 // reset the DRIBBLE click count
        // remove the DRIBBLE button from the DOM and replace it with the DEFEND button
        dribbleBtn.style.display = "none"
        defendBtn.style.display = "block"
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