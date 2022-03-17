// keeps track of who's turn it is
let activePlayer = "X";


// This array stores an array of moves. It is used to determine win conditions
let selectedSquares = [];

// this function is for placing an X or O in a square.
function placeXOrO(squareNumber) {


    //This condition ensures a square hasn't been selected already
    //The.same() metod checks each element of seletedSquare array to see if it contains the sqare number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // This variable retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        // This condition checks who's turn it is.
        if (activePlayer === "X") {
            // if player is X , x.png image placed in HTML element
            select.style.backgroundImage = "url('images/x.png')";
            // Active player may only be X or O. so if not X than else is O
        } else {
            // display o.png if activePlayer = O
            select.style.backgroundImage = "url('images/o.png')"
        }


        // The two variable are concatenated togheter and added to the array.
        selectedSquares.push(squareNumber + activePlayer);

        // Check for any win condition.
        checkWinConditions();


        // This condition is for checking the active player.
        if (activePlayer === "X") {
            activePlayer = "O";
        } else {
            activePlayer = "X"
        }


        //This function plays placement sound
        audio('./media/place.mp3');


        //Checks to see if it's computers turn.
        if (activePlayer === "O") {
            //disable click for computer choise.
            disableClick();

            //This function pouse for 1 sec before placing the image and enabling click.
            setTimeout(function () { computersTurn(); 1000 });
        }

        //Returning true is needed for computersTurn() function to work
        return true
    }

    //This function returns in a random square being selected.
    function computersTurn() {

        //Boolean needed for the while loop
        let success = false;

        //This variable stores 9 numbers (form 0 to 8).
        let pickSquare;

        //This condition alows the while loop to keep trying if a sqare is selected already
        while (!success) {
            //A random number between 0 and 8 is selected
            pickSquare = String(Math.floor(Math.random() * 9));

            //if the random number passed into the function placeXOrO returns true, the square hasn't been selected
            if (placeXOrO(pickSquare)) {

                //This line calls the function.
                placeXOrO(pickSquare);

                //Once the function is executted, the next line changes the boolean and ends the loop
                success = true;
            };
        }

    }
}

function checkWinConditions() {
    /* if X completes a line*/
    //X 0,1,2 condition
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }

    //X 3,4,5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }

    //X 6,7,8 condition
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }

    //X 0,3,6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }

    //X 1,4,7 condition
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(305, 50, 304, 558) }

    //X 2,5,8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }

    //X 6,4,2 condition
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 508, 100) }

    //X 0,4,8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 508, 508) }


    /* if O completes a line*/
    //O 0,1,2 condition
    if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }

    //O 3,4,5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }

    //O 6,7,8 condition
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }

    //O 0,3,6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }

    //O 1,4,7 condition
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(305, 50, 304, 558) }

    //O 2,5,8 condition
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }

    //O 6,4,2 condition
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 508, 100) }

    //O 0,4,8 condition
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 508, 508) }

    //Checks for tie, if non of the above aplies, next line is executed
    else if (selectedSquares.length >= 9) {

        //Plays a tie song
        audio('./media/tie.mp3');

        //Sets a 0.3 second time before the resetGame gets called.
        setTimeout(function () { resetGame(); }, 1000)
    }

    //Checks if an array includes 3 strings.
    //It is used to check for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {

        //The next 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);

        //If the 3 variables we pass are all included in our array true is returned and our else if condition executes the drawWinLine function.
        if (a === true && b === true && c === true) { return true; }
    }

}

//This makes the body element temporarily unclickable.
function disableClick() {
    //click disable temporarily.
    body.style.pointerEvents = 'none';

    // This makes click available again in 1 second.
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

//This function takes a string parameter of the path it was set earlier for plavement sound ('./media/place.mp3')
function audio(audioURL) {
    //Create a new audio object and pass the path as a parameter
    let audio = new Audio(audioURL);

    //play method plays the audio sound.
    audio.play();
}

//This function utilizes HTML canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {

    //This line accesses the HTML canvas element.
    const canvas = document.getElementById('win-lines');

    //Gives access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');

    //Start of a lines x axis.
    let x1 = coordX1,

        //Start of lines y axis.
        y1 = coordY1,

        //End of lines x axis 
        x2 = coordX2,

        //End of lines y axis
        y2 = coordY2,

        //Stores temparary x axis data it gets updated in the animation loop
        x = x1,

        //Stores temparary y axis data it gets updated in the animation loop
        y = y1;




    //This function interacts with the canvas.
    function animateLineDrawing() {

        //Creates the loop for when the game ends it restarts.
        const animationLoop = requestAnimationFrame(animateLineDrawing);

        //This method clears content from last loop iteration.
        c.clearRect(0, 0, 608, 608);

        //This method starts a new path.
        c.beginPath();

        //This method moves to a starting point for our lines
        c.moveTo(x1, y1);

        //This line indicates the end point for our line.
        c.lineTo(x, y);

        //This method set the width of our line.
        c.lineWidth = 10;

        //This method sets the color of our line.
        c.strokeStyle = 'rgba(70, 255, 33, .8)';

        //this method drwas everything was mentioned above.
        c.stroke();




        //This condition checks if we've reached the endpoint.
        if (x1 <= x2 && y1 <= y2) {

            //This condition adds 10 to the previos end x point.
            if (x < x2) { x += 10; }

            //This condition adds 10 to the previos end y point.
            if (y < y2) { y += 10; }

            //This condition cancels the animation loop if reach the end points.
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }



        //This condition is similar with the one above
        //It is necessary for the 6, 4, 2 win condition.
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }


    //This function clears the canvas after the win line is draw.
    function clear() {

        //Thid line starts the animation loop.
        const animationLoop = requestAnimationFrame(clear);

        //This line clears the canvas.
        c.clearRect(0, 0, 608, 608);

        //This line stops the animation loop.
        cancelAnimationFrame(animationLoop);
    }



    //This line disallows clicking while the win sound is playing
    disableClick();

    //This line plays the win sounds.
    audio('./media/winGames.mp3');

    //This line calls the main animation loop.
    animateLineDrawing();

    //Wait 1 sec, then: clear canvas, reset game, and allows clicking again.
    setTimeout(function () { clear(); resetGame(); }, 2000);
}


//This function resets the game in a tie or a win.
function resetGame() {

    //this for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {

        //Get the HTML element of digit i.
        let square = document.getElementById(String(i));

        //This removes the elements backgroundImage.
        square.style.backgroundImage = '';
    }

    //This resets the array so its empty to strat over.
    selectedSquares = [];
}

