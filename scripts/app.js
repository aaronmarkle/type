// Typing game difficulties declared
var alphabet = 'abcdefghijklmnopqrstuvwxyz'
var beginner = 'cat dog hello me you yes no hi fun code cool'
var expert = 'difficult mix floor table window pez food fishy'

// Set reference to game screen output
var gameCopy = document.getElementById('game-copy');

// Show game output for selected difficulty
var alphabetButton = document.getElementById('alphabet');
alphabetButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  newGame(alphabet);
}, false);

var beginnerButton = document.getElementById('beginner');
beginnerButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  newGame(beginner);
}, false);

var expertButton = document.getElementById('expert');
expertButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  newGame(expert);
}, false);

// Called when a difficulty button is pressed
var newGame = function(difficulty) {
  gameCopy.classList.remove('finishMessage'); //remove finish screen css
  gameCopy.textContent = difficulty;
  gameToArray();
  drawScreen();
}

// Convert selected difficulty into array
var gameToArray = function() {
  currentLocation = 0;
  gameArray = gameCopy.textContent.split('');
  currentLetter = gameArray[currentLocation];
}

// Keypress listener
document.addEventListener('keypress', function(event) {
  // Check to see if any of the text inputs are in focus
  if (document.getElementById('user-name') === document.activeElement
    || document.getElementById('user-email') === document.activeElement
    || document.getElementById('user-age') === document.activeElement
    || document.getElementById('user-comments') === document.activeElement) {
  // Act normally (no preventDefault)
  }
  else {
    event.preventDefault(); //prevent space bar from scrolling window
    if (String.fromCharCode(event.which) === currentLetter) {
      gameArray[currentLocation] = currentLetter; //removes highlight from current letter
      currentLocation++;
      currentLetter = gameArray[currentLocation];
      // Check for end
      if (currentLocation === gameArray.length) {
        finish();
      }
      else {
        drawScreen();
      }
    }
    else {
      errors++;
    }
    // Check for first correct keypress (start of game)
    if (currentLocation == 1) {
      // Start timer
      startTime = Date.now();
      var gameStatus = 'live';
      errors = 0;
    }
  }
}, false);

// Redraws gamescreen on each correct keypress to highlight the current letter
var drawScreen = function() {
  if (currentLetter === ' ') {
    gameArray[currentLocation] = '<span class="highlightSpace">' + currentLetter + '</span>';
  } 
  else {
    gameArray[currentLocation] = '<span class="highlight">' + currentLetter + '</span>';
  }
  gameCopy.innerHTML = gameArray.join('');
}

// Displays win screen
var finish = function() {
  endTime = Date.now();
  totalTime = (endTime - startTime) / 1000;
  var lpm = (gameArray.length / totalTime).toFixed(2);
  gameCopy.classList.add('finishMessage');
  if (errors === 1) {
    gameCopy.innerHTML = 'You typed <span class="highlight">' + lpm + '</span> letters per second with <span class="highlight">' + errors + '</span> error!';
  }
  else {
    gameCopy.innerHTML = 'You typed <span class="highlight">' + lpm + '</span> letters per second with <span class="highlight">' + errors + '</span> errors!';
  }
  gameStatus = 'finished';
}

// Toggle leaderboard on webpage
var leaderboardsButton = document.getElementById('toggle-leaderboards');
leaderboardsButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  var leaderboards = document.getElementById('leaderboards');
  leaderboards.classList.toggle('hidden');
}, false);