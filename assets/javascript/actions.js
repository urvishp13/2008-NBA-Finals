let click = 0 // used to count number of times action buttons clicked
const startPeriodBtn = document.getElementById("start-period-btn")
const periodCounter = document.getElementById("period-counter")

// create a start game function
function startGame() {
    liveResults.textContent = ""

    // // start timer
    // clock = setInterval(countdown, 1000)
    
    youDisp.textContent = 0
    meDisp.textContent = 0

    // make the NEW GAME button disappear
    newGameBtn.style.display = "none"

    startNewPeriod()
}

function startNewPeriod() {
    // start the timer
    clock = setInterval(countdown, 1000)
    
    // increment the period count by 1
    periodCounter.textContent = Number(periodCounter.textContent) + 1

    // first possession always is given to YOU (the game player)
    newPossession("YOU")

    startPeriodBtn.style.display = "none"
}

// create a dribble function 
function dribble() {
    // YOU have ball, so ME gets to stop you 3 times (defend) aka YOU get to dribble 3 times to score
    // with each dribble (click of button), add one random number to YOU (between -5 and 25)
    
    click++ // function ran, so one DRIBBLE button click counted

    const currDribble = Math.floor( Math.random() * 31 ) - 5

    
    if (currDribble < 0) { // if YOU randomly get a negative number of this dribble
        turnover("YOU")    // YOU caused a turnover
        click = 0          // reset so, after turnover is completed, residual click counts are not left and can defend will all
                           //   3 clicks
        return             // possession over
    }

    you += currDribble

    // if ME committed a foul while YOU were dribbling
    if (me < 0) {
        stopOffensivePlay()
        click = 0 // reset click count to allow count of 2 free throw attempts
        foul("ME")
        return
    }

    // if YOU dribbled 3 times, YOU have to shoot
    if (click === 3) {
        forcedShot("YOU")
        click = 0 // reset the click count --> preparing to count defend attempts
        return
    }

    liveResults.textContent = "YOU are still dribbling the ball."
}

// this shot can be done before 3 dribbles are completed, for shooting 2-pointers/3-pointers
function shoot(num) {
    // get the probability of shot being successful
    const probability = Math.random()

    // if the probability > 0.5, shot is made. Increase YOUR score by num
    if (probability > 0.5) {
        youDisp.textContent = Number(youDisp.textContent) + num
    }

    // after shot taken, give the ball to ME
    changePossession("ME")

    if (probability > 0.5) {
        liveResults.textContent = `YOU made a ${num}-pointer! ${liveResults.textContent}`
    }
}

function shootFreeThrow(shooter) {
    click++

    // get the probability of FT being successful
    const probability = Math.random()

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
        turnover("ME") 
        click = 0   
        return
    }

    me += currDribble

    // console.log("click", click, ", you", you, ", me", me)

    if (you < 0) {
        stopDefensivePlay()
        click = 0
        foul("YOU")
        return
    }

    if (click === 3) {
        forcedShot("ME")
        click = 0 // reset the click count --> preparing to count dribble attempts
        return
    }

    liveResults.textContent = "ME is still dribbling the ball."
}
