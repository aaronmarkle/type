// Typing test difficulties declared
var alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
var beginner = "cat dog hello me you yes no hi fun"
var expert = "difficult mix floor table window pez food carpet"

var testCopy = document.getElementById("game-copy");

$("#alphabet").click(function() {
  testCopy.textContent = alphabet;
  testToArray();
});

$("#beginner").click(function() {
  testCopy.textContent = beginner;
  testToArray();
});

$("#expert").click(function() {
  testCopy.textContent = expert;
  testToArray();
});

/* Steps for game

Grab current test text
Convert to array with each letter character being its own item
Set first letter to currentLetter
When currentLetter key pressed, go to next letter

*/

var testToArray = function() {
  var testArray = testCopy.textContent.split('');
  var currentLetter = testArray[0];
  console.log(currentLetter);
}