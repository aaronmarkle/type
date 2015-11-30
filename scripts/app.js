// Typing test difficulties declared
var alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
var beginner = "cat dog hello me you yes no hi fun"
var expert = "difficult mix floor table window pez food fishy"

var testCopy = document.getElementById("game-copy");

$("#alphabet").click(function() {
  this.blur(); //de-focus button
  testCopy.textContent = alphabet;
  testToArray();
});

$("#beginner").click(function() {
  this.blur(); //de-focus button
  testCopy.textContent = beginner;
  testToArray();
});

$("#expert").click(function() {
  this.blur(); //de-focus button
  testCopy.textContent = expert;
  testToArray();
  drawScreen();
});

var testToArray = function() {
  currentLocation = 0;
  testArray = testCopy.textContent.split('');
  currentLetter = testArray[currentLocation];
  console.log(currentLetter);
  console.log(testArray.length);
}

document.addEventListener('keypress', function(event) {
  event.preventDefault(); //prevent space bar from scrolling window
  if (String.fromCharCode(event.which) == currentLetter) {
    console.log('Correct!');
    testArray[currentLocation] = currentLetter;
    currentLocation++;
    currentLetter = testArray[currentLocation];
    drawScreen();
    if (currentLocation == testArray.length) {
      console.log('WIN!');
      //end timer
      endTime = Date.now();
      totalTime = (endTime - sdtartTime) / 1000;
      var lpm = (testArray.length / totalTime);
      console.log('You typed ' + lpm + ' letters per second!')
    }
  }
  if (currentLocation == 1) {
    // start timer
    startTime = Date.now();
  }
  }
  , false);

var drawScreen = function() {
  testArray[currentLocation] = '<span class="highlight">' + currentLetter + '</span>';
  console.log(testArray);
  testCopy.innerHTML = testArray.join('');
}













