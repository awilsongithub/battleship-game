
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
    document.getElementById('home-p').innerHTML = "3 ships are hidden somewhere in the game board. Each ship is 3 squares long. Your mission: Fire and hit each square of a ship to sink it. Sink all 3 ships in as few plays as possible. Ships are horizontal or vertical but not diagonal. Aim by entering a game square's coordinates (ie a1, a2, b3...) then type Enter or click the FIRE button.";


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
    // alert('timeout in 4 test');
    location.assign('file:///Users/adamwilson/dragons/battleship-game/game.html')
}
