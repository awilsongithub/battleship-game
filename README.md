# Battleship-Game
Battleship style game written with vanilla javascript.

# About the Project
Like to play Battleship? You'll love BattleBanana. Ready, Aim, Fire! I wrote this app to practice my javascript. I wanted the UX to be richer and smoother than other online battleship games and it is if you don't mind typing and you're not on a smartphone. v2 will allow players to aim and fire by tapping game board squares on their touch screen and provide a better layout on XS devices.

# Technical Approach
A more basic version of this game is the project for the book Head First Javascript (great book!). You'll find lots of JS basics featured in the game code including objects, event handlers, conditional logic, array iteration, DOM manipulation and more. To the basic game I added a welcome screen with transitions into the game screen using location.assign() and setTimeout() and sound effects with HTML5 audio. I organized my styling with LESS nesting, functions, variables and operations. Finally, I put the game online with Heroku using a single required index.php file that "includes" our home.html home screen file (static html sites not otherwise allowed on heroku).

# Layout and Design Notes
-Game screen layout achieved by overlaying a bootstrap grid with absolute positioning onto a background image.
-Put game controls under game board for better narrow screen UX.
-experimented with background images for fireButton, messageArea, form, guessInput.
-failed to implement a downloaded ttf font and reverted to google font.
-Removed metallic form background. It was too visually "heavy" and didn't mesh with other visual elements.
-Implemented LESS nesting, functions, variables and operations. LESS compiled using Crunch2.
-Game sounds and soundtracks using HTML5 audio tags, and JS event handlers.
-Screen transitions implemented with location.assign(). Delays and timing implemented with setTimeout().
-Heroku hosting enabled with a single required index.php file that "includes" our home.html home screen file (static html sites not otherwise allowed on heroku).

# Javascript Game Logic Notes
- This game is written entirely with vanilla Javascript.
  - Game logic code is inside a model, view and controller object and a few other functions.
  - View object functions display messages and game graphics when players fire and hit or miss.
  - The model object tracks ship locations, hit-status and other vital stats and game variables. It also has methods to randomly generate ship locations, help the controller process user guesses and implement related game logic.
  - The controller object processes user guesses, calling on model object helper methods and initiates game over sequence.

# Unsolved Problems
- Bootstrap column grid for x-small is broken on smartphone emulation in dev tools and not great on my phone.
- Smartphone user story not met as keyboard pop-up on phone obscures game. unacceptable. Need to implement fire by tap on table cells.
