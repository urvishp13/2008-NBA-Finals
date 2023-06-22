let click = 0 // used to count number of times action buttons clicked

// create a start game function
function startGame() {
    liveResults.textContent = ""
    
    /* first possession always is given to YOU (the game player), hence why only dribble button (and not defend) button 
       is displayed */
    youDisp.textContent = 0
    meDisp.textContent = 0

    newPossession("YOU")

    // make the NEW GAME button disappear
    newGameBtn.style.display = "none"
}

// create a dribble function 
function dribble() {
    // YOU have ball, so ME gets to stop you 3 times (defend) aka YOU get to dribble 3 times to score
    // with each dribble (click of button), add one random number to YOU (between -5 and 25)
    
    click++ // function ran, so one DRIBBLE button click counted

    const currDribble = Math.floor( Math.random() * 31 ) - 5

    console.log("click", click, ", me", me, ", you", you, ", currDribble", currDribble)
    
    if (currDribble < 0) { // if YOU randomly get a negative number of this dribble
        click = 0
        turnover("YOU")    // YOU caused a turnover
        return             // possession over
    }

    you += currDribble

    console.log("click", click, ", me", me, ", you", you)

    // if ME committed a foul while YOU were dribbling
    if (me < 0) {
        click = 0 // reset click count to count 2 free throw attempts
        stopOffensivePlay()
        foul("ME")
        return
    }

    // if YOU dribbled 3 times, YOU have to shoot
    if (click === 3) {
        forcedShot("YOU")
        click = 0 // reset the click count --> preparing to count defend count
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

function shootFreeThrow(shooter) {
    click++

    // get the probability of FT being successful
    const probability = Math.random()
    // const probability = 0.5

    // if the probability > 0.5, FT is made. Increase shooter's score by 1
    if (probability >= 0.5) {
        if (shooter === "YOU") {
            youDisp.textContent = Number(youDisp.textContent) + 1 // YOU are allowed to shoot free throws
        } else {
            meDisp.textContent = Number(meDisp.textContent) + 1 // YOU are allowed to shoot free throws
        }
        liveResults.textContent = `${shooter} made a free throw(s).`
    } else { // if probability < 0.5, FT is missed
        liveResults.textContent = `${shooter} missed the free throw attempt(s).`
    }

    console.log(`${shooter} shot 2 FTs`, click)
    
    if (click === 2) { // if 2 free throws have been shot
        click = 0 // reset SHOOT FT button click count for next time when allowed to shoot free throws
        
        // don't allow YOU/ME to shoot anymore free throws
        freeThrowBtn.style.display = "none" // free throws done --> remove SHOOT FT button
        // give the ball to foul violator after the shooter shot their free throws
        if (shooter === "YOU") {
            changePossession("ME")  // give ME the ball
            beginDefensivePlay() // YOU are back on defense
        } else {
            changePossession("YOU") // give YOU the ball
            beginOffensivePlay() // YOU have the ball again
        }
    }
}

// create a defend function --> opposite of dribble function i.e. ME has the ball now and YOU are defending
function defend() {
    click++

    const currDribble = Math.floor( Math.random() * 31 ) - 5
    
    console.log("click", click, ", me", me, ", you", you, ", currDribble", currDribble)
    
    if (currDribble < 0) { 
        click = 0
        turnover("ME")    
        return
    }

    me += currDribble

    // console.log("click", click, ", you", you, ", me", me)

    if (you < 0) {
        click = 0
        stopDefensivePlay()
        foul("YOU")
        return
    }

    if (click === 3) {
        forcedShot("ME")
        click = 0 // reset the click count --> preparing to count dribble count
    }
}
