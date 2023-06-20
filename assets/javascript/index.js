// create a start game function
    // first possession always is given to YOU (the player)
    // give YOU a random number between -5 and 25 --> dribbling
    // give ME (the computer) a random number between -10 and 50 --> defending

    // YOU has 3 dribbles/defending opportunities to score/cause turnover: call action function


// create an action function (for dribbling/defending)
    // if YOU have ball, ME gets to stop you 3 times (defend), so YOU are dribbling
        // with each dribble, add one random number to ME (between -5 and 25)
    // if after 3 times
        // YOU > ME by 10 or more points, 3 points scored by YOU
        // YOU > ME by 3 or more points, 2 points scored by YOU
        // If ME is negative, YOU get one point (ME committed a foul)
        // If YOU are negative, YOU commit a turnover
     