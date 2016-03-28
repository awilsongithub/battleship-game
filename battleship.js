/*
=============================================================
MODEL, VIEW, CONTROLLER OBJECT IMPLEMENT THE GAME
=============================================================
*/

/*
=============================================================
SIMPLE CHANGES
TODO board shrink to 90% size so fits on screens
TODO put form, mssgs etc all on right side
TODO welcome message at start
TODO display guesses and mssg that lower # score better
TODO sound effects for hit, miss, ongoing, sunk, sunk all
TODO name battleships, display name upon sunk with modal for info about it
TODO play again button uses document.location.reload() reload page

NEW VERSIONS OF GAME (also see trello board ideas)
TODO make it a word game. see experimental section at bottom....

CLICK ON CELL TO FIRE CODE
    assign .onclick handler to each td
        iterate over 0-6 row,
        for each row, iterate over 0-6 column and assign
    the eventObj is then the td element and is passed to handler
        assign eventObj.target to a variable
        variable id is the guess argument passed to processGuess
    existing code takes it from there

=============================================================
*/

// onload triggers init() to initiate execution based on user input
window.onload = init;

// init assignes an event handler for fire button
function init() {
    view.displayMessage("Enter a location and click 'FIRE' or press Enter.")
    // backgroundSound();
    var fire = document.getElementById('fireButton');
    fire.onclick = handleFireButton; // assign handler don't call it
    // fire with keypress of return
    var guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress; // assign handler dont' call it

    model.generateShipLocations();
} // end init

// show instructions on home welcome page with buttons to proceed to play
function showInstructions() {
    var backdrop = document.getElementById('jumbotron');
    var headingElement = document.createElement('h1');
    var headingText = document.createTextNode("Here's the deal");
    headingElement.appendChild(headingText);
    backdrop.appendChild(headingElement);


}

function gameOver(guesses) {
    // play monkey sounds
    document.getElementById("background-sound").pause();
    document.getElementById("win-game").play();

    console.log(guesses);
    view.displayMessage("You sunk all my battle-bananas in " + guesses + " guesses!");
    // in 2 secs go to game over screen
    // home customized or new page
    window.setTimeout(goToGameOverScreen, 8000);
}

function goToGameOverScreen() {
    // TODO this gave error " Not allowed to load local resource: file:///Users/adamwilson/dragons/battleship-game/home.html "
    // location.assign('home.html');

    // try to provide absolute url?:
    location.assign('http://battlebanana.herokuapp.com/home.html');

    // or try instead to simply reload current page with
    // location.reload(true);
}

// sound effect functions
function fireAndHit() {
    document.getElementById("hit-sound").play();
}
function fireAndMiss() {
    document.getElementById("miss-sound").play();
}
function backgroundSound() { // called on load
    document.getElementById("background-sound").play();
}
function shipGotSunk() {
    document.getElementById("monkey-lost-ship").play();
}


// get user input value and pass to controller
function handleFireButton() {
    // get input element then it's value in 2 steps
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value;
    var guessUpperCase = guess.toUpperCase(); // a1 > A1 etc.
    console.log(guessUpperCase);
    // call code to process input value in controller
    controller.processGuess(guessUpperCase);
    // clear input field
    guessInput.value = "";
}

// fire by hitting Enter
function handleKeyPress(e) {
    var fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13)  { // e for event, 13 is keycode for Enter key
        fireButton.click();
        return false; // so form doesn't do anything else
    }
}


// view object
var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
        // couldv'e also used createTextNode and appendChild
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

// testing view object
// view.displayMessage("Testing the message display method of view object");
// view.displayMiss("01");
// view.displayHit("34");
// view.displayMiss("66");


// model object tracks status, hits, misses, etc.
var model = {
    // we can change game later by changing these properties
    boardsize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships:  [ {locations: [0, 0, 0], hits: ["", "", ""] },
            {locations: [0, 0, 0], hits: ["", "", ""] },
            {locations: [0, 0, 0], hits: ["", "", ""] } ],

    // take user guess. Iterate over ship locations to determine if hit
    fire: function(guess) {
        // check all ship locations for guess match
        for (var i = 0; i < this.numShips; i++ ) {
            var ship = this.ships[i];
            // indexOf rtns index of guess or -1
            var index = ship.locations.indexOf(guess);

            // if hit
            if (index >= 0) {
                ship.hits[index]= "hit";
                fireAndHit(); // sound
                view.displayHit(guess);
                view.displayMessage("HIT!");

                // if ship is sunk
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                    view.displayMessage("You sunk my battle-banana!");
                    shipGotSunk(); // plays monkey sound
                }
                return true;
            }
        } // end loop

        // if miss
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        fireAndMiss();
        return false;

    }, // end fire

    // take ship & check hits array
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++ ) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }, // end isSunk

    // this master method uses genShips and collision helpers
    generateShipLocations: function() {
        // declare locations variable
        var locations;
        // iterate for # of ships
        for (var i = 0; i < this.numShips; i ++) {
            // generate a ship's locations repeatedly until collision method returns false (no collisions thus successful)
            // do while loop executes and repeats until while === false
            do {
                locations = this.generateShip();
            } while ( this.collision(locations) );
            // store locations into ship object in ships property
            console.log(locations); // for debugging
            console.log(this.ships[i]); // for debugging
            this.ships[i].locations = locations;
        }
    }, // end generateShipLocations

    // generate the location cells of a single ship
    generateShip: function() {
        // randomly determine vertical or horizontal ship directions
        var direction = Math.floor(Math.random() * 2); // 0 or 1
        var row, col;

        if (direction === 1) { // horizontal ship
            // generate starting location row and col
            row = Math.floor(Math.random() * this.boardsize); // 0-6
            col = Math.floor(Math.random() * (this.boardsize - this.shipLength)); // 0-4
        } else { // vertical ship
            col = Math.floor(Math.random() * this.boardsize); // 0-6
            row = Math.floor(Math.random() * (this.boardsize - this.shipLength)); // 0-4
        }

        // add the rest of the ship cell locations to the start cell
        var newShipLocations = [];
        for (i = 0; i < this.shipLength; i++ ) {
            if (direction === 1) { // horizontal
                // locations are row + col+i (thus col+0, col+1, col+2)
                newShipLocations[i] = row + "" + (col + i);
            } else { // vertical
                newShipLocations[i] = (row + i) + "" + col;
            }
        }
        return newShipLocations;

    }, // end generateShip

    collision: function(locations) {
        // for loop iterate existing ships, for each ship check each location in locations array for match with locations[j] which is a location value of new ship being generated
        for (var i = 0; i < this.numShips; i++ ) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++ ) {
                if ( ship.locations.indexOf(locations[j]) >= 0 ) {
                    return true; // there IS a collision
                }
            }
        }
        return false; // we iterated them all and found no collision

    } // end collision

}; // end model


// testing code for model IT WORKS!!! SUN 11PM
// var userGuess = "06";
// model.fire(userGuess);
// var anotherUserGuess = "16";
// model.fire(anotherUserGuess);
// model.fire("53");
// model.fire("55");
// model.fire("56");
// model.fire("51");




// controller object
var controller = {
    // track guesses
    guesses: 0,

    // process guesses
    processGuess: function(guess) {
        var location = this.parseGuess(guess);
        if (location) {
            this.guesses++;
            console.log(this.guesses);

            // returns true if a hit
            var hit = model.fire(location);

            // check for game over
            if (hit && model.shipsSunk === model.numShips) {
                // go to home page, display message with play, instr, var buttons
                // window.open('home.html');
                gameOver(this.guesses);

            }
        }
    },

    // check validity of guess length, type, values & return T or F
    parseGuess: function(guess) {
        var alphabet = ["A", "B", 'C', 'D', 'E', 'F', 'G'];
        var messageIfInvalidGuess = "Oops, please enter a space on the gameboard.";

        if (guess === null || guess.length !== 2) {
            alert(messageIfInvalidGuess);
        } else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar); // A > 0, B > 1...
            var column = guess.charAt(1);

            if ( isNaN(row) || isNaN(column) ) {
                alert(messageIfInvalidGuess);
            } else if ( row < 0 || row >= model.boardsize || column < 0 || column >= model.boardsize ) {
                alert(messageIfInvalidGuess);
            } else {
                return row + column; // concatenated
            }
        }
        return null; // if we get here there was a failed check
    } // end parseGuess

}; // end controller

// testing controller
// controller.processGuess("A0");
// controller.processGuess("B6");
// controller.processGuess("A6");
// controller.processGuess("C6");
//
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
//
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");

/*
===================================================================
EXPERIMENTAL WORD GAME VERSION IDEAS
===================================================================
*/


// ship objects have third property "letters"
// ships:  [
//     {locations: ["06", "16", "26"], hits: ["", "", ""], letters: ["B", "U", "G"] },
//     {locations: ["24", "34", "44"], hits: ["", "", ""], letters: ["B", "U", "G"] },
//     {locations: ["10", "11", "12"], hits: ["", "", ""], letters: ["B", "U", "G"] } ],

// display scrabble square image and letter on top of it
// function displayHit...


// display letter in the square (td)
// function addTextNode(letter, square) {
//     var letter = document.createTextNode(letter);
//     td = document.getElementById(square);
//     td.appendChild(letter);
// }

// call function with
// var letter = ship.letters[index];
// var square = .......
// addTextNode(letter, square);
