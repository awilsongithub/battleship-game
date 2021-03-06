/* =====================================
INITIALIZE
====================================== */

window.onload = init;

function init() {
  // set ship locations 
  model.generateShipLocations();

  // register handlers
  var fire = document.getElementById("fireButton");
  fire.onclick = handleFireButton;

  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  var tableCells = document.getElementsByTagName("td");
  for (var i = 0; i < tableCells.length; i++) {
    tableCells[i].onclick = cellClickAction;
  }

  // initialize display
  view.displayMessage("TYPE A POSITION & HIT 'ENTER'");
  updateMissileDisplay();
  guessInput.focus();
  backgroundSound();
}

/* ===================================
MISC HELPER FUNCTIONS
======================================*/

function showInstructions() {
  var backdrop = document.getElementById("jumbotron");
  var headingElement = document.createElement("h1");
  var headingText = document.createTextNode("Here's the deal");
  headingElement.appendChild(headingText);
  backdrop.appendChild(headingElement);
}

function gameOver(guesses) {
  document.getElementById("background-sound").pause();
  document.getElementById("win-game").play();
  view.displayMessage("You sunk all my battle-bananas in " + guesses + " guesses!");
  window.setTimeout(goToGameOverScreen, 8000);
}

function goToGameOverScreen() {
  // TODO assigning the local resource gave error: 
  // " Not allowed to load local resource: file:///Users/adamwilson/dragons/battleship-game/home.html "
  // location.assign('home.html');
  // so I'm assigning the hosted site home url 
  location.assign("http://battlebanana.herokuapp.com/home.html");
}

/* ==============================
TIMER 
=============================== */

var timerDisplay = document.querySelector('.timer');

function incrementTimer() {
  // increment 
  model.time.sec++;
  if (model.time.sec >= 60) {
    model.time.sec = 0;
    model.time.min++;
  }
  // format
  let m = model.time.min;
  let s = model.time.sec;
  if(s < 10){ s = '0' + s; }
  // if(m < 10){ m = '0' + m; }
  timerDisplay.innerHTML = m + ':' + s;
}

setInterval(incrementTimer, 1000);


/* ===================================
INPUT HANDLERS 
======================================*/

function cellClickAction() {
  controller.processGuess(this.id);
}

function cellClickShow(eventObj) {
  var cell = eventObj.target;
  cell.style.backgroundImage = "url(media/hit.wav)";
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value.toUpperCase();
  controller.processGuess(guess);
  guessInput.value = "";
}

var missiles = document.querySelector(".missiles");
var missileCount = document.querySelector('.missileCount');

function updateMissileDisplay(){
  console.log('missiles', model.missileCount);
  console.log(missileCount)
  let newHTML = '';
  for (let i=0; i<model.missileCount; i++){
    newHTML += '| ';
  }
  if(model.missileCount < 10) {
    missiles.classList.add('text-danger');
  }
  missileCount.innerHTML = newHTML;

  if (model.missileCount <= 0) {
    alert('out of ammo');
    return true;
  }
}

// fire by hitting Enter
function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false; // so form doesn't do anything else
  }
}

/* ===================================
SOUND EFFECT FUNCTIONS
======================================*/

const hitSound = document.getElementById("hit-sound");
const missSound = document.getElementById("miss-sound");
const bgSound = document.getElementById("background-sound");
const shipSunkSound = document.getElementById("monkey-lost-ship");

var fireAndHit = function () {
  stopOtherSounds();
  hitSound.play();
};
var fireAndMiss = function () {
  stopOtherSounds();
  missSound.play();
};
function backgroundSound() {
  bgSound.play();
}
function playSunkSound() {
  stopOtherSounds();
  fireAndHit();
  setTimeout(function () {
    stopOtherSounds();
    shipSunkSound.play();
  }, 400);
}
function stopOtherSounds() {
  console.log(hitSound);
  hitSound.pause();
  hitSound.currentTime = 0;
  missSound.pause();
  missSound.currentTime = 0;
}

/* ===================================
VIEW OBJECT 
displays stuff
======================================*/

var view = {
    messageArea: document.getElementById("messageArea"),
    sunk: document.getElementsByClassName('sunk'),

  displayMessage: function(msg) {
    this.messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
  displayNumSunk: function() {
      console.log('sunk', model.shipsSunk);
      console.log(this.sunk[0])
      this.sunk[0].innerHTML = model.shipsSunk;
  }
};

/* ===================================
MODEL OBJECT
tracks status, hits, misses, locations etc.
======================================*/

var model = {
  boardsize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  missileCount: 30,

  // hits array values changed to "hit" when hit
  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] }
  ],

  // object to hold timer state with initial values 
  time: {
    min: 0,
    sec: 0,
  },

  fire: function(guess) {

    // misc tasks 
    model.missileCount--;
    updateMissileDisplay();

    guessInput.focus();

    // check ship locations
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);

      // if hit
      if (index >= 0) {
        ship.hits[index] = "hit";
        fireAndHit(); // sound
        view.displayHit(guess);
        view.displayMessage("HIT!");

        // if sunk
        if (this.isSunk(ship)) {
          this.shipsSunk++;
          view.displayNumSunk();
          view.displayMessage("You sunk my battle-banana!");
          playSunkSound();
        }
        return true;
      }
    }

    // if miss
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    fireAndMiss();
    return false;
  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  // this master method uses genShips and collision helpers
  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      // generate a ship's locations repeatedly until collision method returns false
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  // generate the location cells of a single ship
  generateShip: function() {
    // vertical or horizontal
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    // if horizontal ship, set row to a random number in the scope of the game board size. set the column to a number in this scope but subtract the length of a ship to allow us to add the additional 2 cells to it.
    if (direction === 1) {
      // generate starting location row and col
      row = Math.floor(Math.random() * this.boardsize); // 0-6
      col = Math.floor(Math.random() * (this.boardsize - this.shipLength)); // 0-4
    } else {
      // vertical ship
      col = Math.floor(Math.random() * this.boardsize); // 0-6
      row = Math.floor(Math.random() * (this.boardsize - this.shipLength)); // 0-4
    }

    // add rest of ship cell locations
    var newShipLocations = [];
    for (i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        // horizontal
        newShipLocations[i] = row + "" + (col + i);
      } else {
        // vertical
        newShipLocations[i] = row + i + "" + col;
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    // for loop iterate existing ships, for each ship check each location in locations array for match with locations[j] which is a location value of new ship being generated
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
}; // end model

/* ===================================
CONTROLLER OBJECT
parse and process guesses
======================================*/
var controller = {
  guesses: 0,

  processGuess: function(guess) {
    // if guess comes from keyboard input, parse it into numbers. if comes from click on board it is already numbers and we skips parseGuess
    // check first guess.charAt(0) and if NaN then call parseGuess, otherwise it is a num and we just need to pass it as is
    var location;
    if (isNaN(guess.charAt(0))) {
      location = this.parseGuess(guess);
    } else {
      location = guess;
    }
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        gameOver(this.guesses);
      }
    }
  },

  // check for invalid guesses, return guess translated to nums ie 01
  parseGuess: function(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    var messageIfInvalidGuess = "Oops, please enter a space on the gameboard.";

    if (guess === null || guess.length !== 2) {
      alert(messageIfInvalidGuess);
    } else {
      var firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar); // A > 0, B > 1...
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert(messageIfInvalidGuess);
      } else if (
        row < 0 ||
        row >= model.boardsize ||
        column < 0 ||
        column >= model.boardsize
      ) {
        alert(messageIfInvalidGuess);
      } else {
        return row + column;
      }
    }
    return null; // if we get here there was a failed check
  } // end parseGuess
}; // end controller

// for testing controller
// controller.processGuess("A0");
// controller.processGuess("B9");
// controller.processGuess("A6");
