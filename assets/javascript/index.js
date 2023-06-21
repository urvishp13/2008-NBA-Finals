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

// create a dribble function 
function dribble() {
    // YOU have ball, so ME gets to stop you 3 times (defend) aka YOU get to dribble 3 times to score
    // with each dribble (click of button), add one random number to YOU (between -5 and 25)
    
    click++ // function ran, so one DRIBBLE button click counted

    const currDribble = Math.floor( Math.random() * 31 ) - 5

    console.log("click", click, ", me", me, ", you", you, ", currDribble", currDribble)
    
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
        forcedShot("YOU")
        click = 0 // reset the click count --> preparing to count defend count
    }
}
     
// create a defend function --> opposite of dribble function i.e. ME has the ball now and YOU are defending
function defend() {
    click++

    const currDribble = Math.floor( Math.random() * 31 ) - 5
    
    console.log("click", click, ", me", me, ", you", you, ", currDribble", currDribble)
    
    if (currDribble < 0) { 
        turnover("ME")    
        return
    }

    me += currDribble

    // console.log("click", click, ", you", you, ", me", me)

    if (you < 0) {
        foul("YOU")
        return
    }

    if (click === 3) {
        forcedShot("ME")
        click = 0 // reset the click count --> preparing to count dribble count
    }
}