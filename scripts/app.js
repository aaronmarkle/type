// Typing game difficulties declared
var alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
var beginner = 'cat dog hello me you yes no hi fun'
var expert = 'difficult mix floor table window pez food fishy'

// Set reference to game screen output
var gameCopy = document.getElementById('game-copy');

// Show game output for selected difficulty
var alphabetButton = document.getElementById('alphabet');
alphabetButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  gameCopy.classList.remove('finishMessage');
  gameCopy.textContent = alphabet;
  gameToArray();
  drawScreen();
}, false);

var beginnerButton = document.getElementById('beginner');
beginnerButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  gameCopy.classList.remove('finishMessage');
  gameCopy.textContent = beginner;
  gameToArray();
  drawScreen();
}, false);

var expertButton = document.getElementById('expert');
expertButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  gameCopy.classList.remove('finishMessage');
  gameCopy.textContent = expert;
  gameToArray();
  drawScreen();
}, false);

var leaderboardsButton = document.getElementById('toggle-leaderboards');
leaderboardsButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  var leaderboards = document.getElementById('leaderboards');
  leaderboards.classList.toggle('hidden');
}, false);

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
    if (String.fromCharCode(event.which) == currentLetter) {
      gameArray[currentLocation] = currentLetter; //removes highlight from current letter
      currentLocation++;
      currentLetter = gameArray[currentLocation];
      // Check for end
      if (currentLocation == gameArray.length) {
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
  if (currentLetter == ' ') {
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
  gameCopy.innerHTML = 'You typed <span class="highlight">' + lpm + '</span> letters per second with <span class="highlight">' + errors + '</span> errors!';
  gameStatus = 'finished';
}