/*
=============================================================
MODEL, VIEW, CONTROLLER OBJECT IMPLEMENT THE GAME
=============================================================
*/

// view object
var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
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
view.displayMessage("Testing the message display method of view object");
view.displayMiss("01");
view.displayHit("34");
view.displayMiss("66");


// model object tracks status, hits, misses, etc.
var model = {
    // we can change game later by changing these properties
    boardsize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships:  [ {locations: ["06", "16", "26"], hits: ["", "", ""] },
            {locations: ["24", "34", "44"], hits: ["", "", ""] },
            {locations: ["10", "11", "12"], hits: ["", "", ""] } ],

    // take user guess. Iterate over ship locations to determine if hit
    fire: function(guess) {

        // check all ship locations for guess match
        for (var i = 0; i < this.numShips; i++ ) {
            var ship = this.ships[i];
            // indexOf rtns index of guess or -1
            var index = ship.locations.indexOf(guess);

            // if ship is hit
            if (index >= 0) {
                ship.hits[index]= "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                // if ship is sunk
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                    view.displayMessage("You sunk my battleship!");
                }
                return true;
            }
        } // end loop

        // if miss
        view.displayMiss(guess);
        view.displayMessage("You missed.");
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
    } // end isSunk

}; // end model


// testing code for model IT WORKS!!! SUN 11PM
var userGuess = "06";
model.fire(userGuess); // should display hit in A6
var anotherUserGuess = "16";
model.fire(anotherUserGuess);
model.fire("53");
model.fire("55");
model.fire("56");
model.fire("52");



// controller object
