
// onload triggers init() to initiate execution based on user input
window.onload = function() {
    backgroundSound();

    var instructionsButton = document.getElementById('show-instructions');
    instructionsButton.onclick = showInstructions; // handler

    var startGameButton = document.getElementById('start-game-button');
    console.log(startGameButton);
    startGameButton.onclick = startGameSetTimeout;
};

var showInstructions = function () {
    // var backdrop = document.getElementById('jumbotron');
    // var homeHeading = document.getElementById('home-heading');
    // homeHeading.innerHTML = "Here's The Deal";
    console.log('showInstructions called');
    document.getElementById('home-heading').innerHTML = "How To Play:";
    document.getElementById('home-p').innerHTML = "9 items are hidden on the 7x7 game board. Enter locations and click the FIRE button (or hit return) to find them. Items are hidden in groups of 3 horizontally or vertically.";

    // var headingElement = document.createElement('H1');
    // var headingText = document.createTextNode("Here's the deal");
    // headingElement.appendChild(headingText);
    // backdrop.appendChild(headingElement);
};

var backgroundSound = function () { // called on load
    document.getElementById("background-sound").play();
};

// start game on click of play: play start tune
// and then set timeout for 4 seconds and
// location.assign to game screen
var startGameSetTimeout = function () {
    document.getElementById("background-sound").pause();
    document.getElementById('start-game').play();
    var headingText = document.getElementById('home-heading');
    headingText.innerHTML = 'loading...';
    document.getElementById('home-p').innerHTML = '';
    window.setTimeout( startGameNow, 4500);
};

var startGameNow = function () {
    location.assign('game.html');
};
