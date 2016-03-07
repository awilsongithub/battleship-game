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
    // not hard-coding allows changes to game
    boardsize: 7,
    numShips: 3,
    shipLength: 3,

    shipsSunk: 0,

    ships:  [ {locations: ["06", "16", "26"], hits: ["", "", ""] },
            {locations: ["24", "34", "44"], hits: ["", "", ""] },
            {locations: ["10", "11", "12"], hits: ["", "", ""] } ],



    // take user guess. Iterate over ship locations to determine if hit
    fire: function(guess) {
        for (var i = 0; i < numShips; i++ ) {
            var ship = this.ships[i];
            // indexOf searches array for value & rtns it's index or -1
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index]= "hit";
                // is ship Sunk? if so shipsSunk++
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                }
                return true;
            }
        } // end loop
        return false;
    }, // end fire

    // take ship & check hits array
    isSunk: function(ship) {
        for (var i = 0; i < shipLength; i++ ) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    } // end isSunk








}; // end model






// controller object
