// Typing game difficulties declared
var alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
var beginner = "cat dog hello me you yes no hi fun"
var expert = "difficult mix floor table window pez food fishy"

// Set reference to game screen output
var gameCopy = document.getElementById("game-copy");

// Show game output for selected difficulty
$("#alphabet").click(function() {
  this.blur(); //de-focus button
  gameCopy.textContent = alphabet;
  gameToArray();
  drawScreen();
});

$("#beginner").click(function() {
  this.blur(); //de-focus button
  gameCopy.textContent = beginner;
  gameToArray();
  drawScreen();
});

$("#expert").click(function() {
  this.blur(); //de-focus button
  gameCopy.textContent = expert;
  gameToArray();
  drawScreen();
});

// Convert selected difficulty into array
var gameToArray = function() {
  currentLocation = 0;
  gameArray = gameCopy.textContent.split('');
  currentLetter = gameArray[currentLocation];
}

// Keypress listener
document.addEventListener('keypress', function(event) {
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
  // Check for first correct keypress (start of game)
  if (currentLocation == 1) {
    // Start timer
    startTime = Date.now();
  }
  }
  , false);

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

var finish = function() {
  endTime = Date.now();
  totalTime = (endTime - startTime) / 1000;
  var lpm = (gameArray.length / totalTime).toFixed(2);
  gameCopy.textContent = 'You typed ' + lpm + ' letters per second!';
}













