
// onload triggers init() to initiate execution based on user input
window.onload = function() {
    backgroundSound();

    var instructionsButton = document.getElementById('show-instructions');
    instructionsButton.onclick = showInstructions; // handler

    var startGameButton = document.getElementById('start-game-button');
    console.log(startGameButton);
    startGameButton.onclick = startGameSetTimeout;
};

var instructions = "9 items are hidden on the game board in groups of 3 (horizontally or vertically). Find them in as few guesses as possible. Guess by clicking a square on the game board (or you can type your guess location and hit enter or press return).";

var showInstructions = function () {
    document.getElementById('home-heading').innerHTML = "How To Play:";
    document.getElementById('home-p').innerHTML = instructions;
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
