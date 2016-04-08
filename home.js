
// onload triggers init() to initiate execution based on user input
window.onload = function() {
    backgroundSound();

    var instructionsButton = document.getElementById('show-instructions');
    instructionsButton.onclick = showInstructions; // handler

    var startGameButton = document.getElementById('start-game-button');
    console.log(startGameButton);
    startGameButton.onclick = startGameSetTimeout;
}

function showInstructions() {
    // var backdrop = document.getElementById('jumbotron');
    // var homeHeading = document.getElementById('home-heading');
    // homeHeading.innerHTML = "Here's The Deal";
    console.log('showInstructions called');
    document.getElementById('home-heading').innerHTML = "How To Play:";
    document.getElementById('home-p').innerHTML = "Ready, Aim, Fire! 9 items are hidden on the game board grid. Enter a grid square location and fire to uncover them all in as few plays as possible. Items are hidden in groups of 3. Type a location and click the FIRE button or hit Enter to fire";

    // var headingElement = document.createElement('H1');
    // var headingText = document.createTextNode("Here's the deal");
    // headingElement.appendChild(headingText);
    // backdrop.appendChild(headingElement);
}

function backgroundSound() { // called on load
    document.getElementById("background-sound").play();
}

// start game on click of play: play start tune
// and then set timeout for 4 seconds and
// location.assign to game screen
function startGameSetTimeout() {
    document.getElementById("background-sound").pause();
    document.getElementById('start-game').play();
    var headingText = document.getElementById('home-heading');
    headingText.innerHTML = 'loading...';
    document.getElementById('home-p').innerHTML = '';
    window.setTimeout( startGameNow, 4500);
}

function startGameNow() {
    location.assign('game.html');
}
