// Typing game difficulties declared
var alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
var beginner = "cat dog hello me you yes no hi fun"
var expert = "difficult mix floor table window pez food fishy"

var gameCopy = document.getElementById("game-copy");

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

var gameToArray = function() {
  currentLocation = 0;
  gameArray = gameCopy.textContent.split('');
  currentLetter = gameArray[currentLocation];
  console.log(currentLetter);
  console.log(gameArray.length);
}

document.addEventListener('keypress', function(event) {
  event.preventDefault(); //prevent space bar from scrolling window
  if (String.fromCharCode(event.which) == currentLetter) {
    console.log('Correct!');
    gameArray[currentLocation] = currentLetter;
    currentLocation++;
    currentLetter = gameArray[currentLocation];
    if (currentLocation == gameArray.length) {
      console.log('WIN!');
      //end timer
      endTime = Date.now();
      totalTime = (endTime - startTime) / 1000;
      var lpm = (gameArray.length / totalTime).toFixed(2);
      console.log('You typed ' + lpm + ' letters per second!');

      gameCopy.textContent = 'You typed ' + lpm + ' letters per second!';
    }
    else {
      drawScreen();
    }
  }
  if (currentLocation == 1) {
    // start timer
    startTime = Date.now();
  }
  }
  , false);

var drawScreen = function() {
  if (currentLetter == ' ') {
    gameArray[currentLocation] = '<span class="highlightSpace">' + currentLetter + '</span>';
  } 
  else {
    gameArray[currentLocation] = '<span class="highlight">' + currentLetter + '</span>';
  }
  gameCopy.innerHTML = gameArray.join('');
}













