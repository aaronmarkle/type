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
});

var testToArray = function() {
  currentLocation = 0;
  testArray = testCopy.textContent.split('');
  currentLetter = testArray[currentLocation];
  console.log(currentLetter);
  console.log(testArray.length);
}

document.addEventListener('keypress', function(event) {
  event.preventDefault();
  if (String.fromCharCode(event.which) == currentLetter) {
    console.log("Correct!");
    currentLocation++;
    currentLetter = testArray[currentLocation];
    if (currentLocation == testArray.length) {
      console.log("WIN!");
    }
  }
  }
  , false);



/* Steps for game

Grab current test text
Convert to array with each letter character being its own item
Set first letter to currentLetter
Listen for keypress
When currentLetter key pressed, go to next letter

*/



/* pseudo code

on keypress {
  counter = 0;
  if (key pressed == currentLetter) {
    counter++;
    if (counter == testArray.length) {
      game ends
      display score
    }
    currentLetter = testArray[counter]
  }
}

*/