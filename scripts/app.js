// Typing test difficulties declared
var alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z"
var beginner = "cat dog hello me you yes no hi fun"
var expert = "difficult mix floor table window pez food carpet"

var testCopy = document.getElementById("game-copy");

$("#alphabet").click(function() {
  testCopy.textContent = alphabet;
});

$("#beginner").click(function() {
  testCopy.textContent = beginner;
});

$("#expert").click(function() {
  testCopy.textContent = expert;
});