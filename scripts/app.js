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

// Toggle leaderboard on webpage
var leaderboardsButton = document.getElementById('toggle-leaderboards');
leaderboardsButton.addEventListener('click', function() {
  this.blur(); //de-focus button
  var leaderboards = document.getElementById('leaderboards');
  leaderboards.classList.toggle('hidden');
  document.getElementById('game-copy').classList.toggle('hidden');
}, false);

var highscoreButton = document.getElementById('highscore-btn');
highscoreButton.addEventListener('click', function() {
  this.blur();
  highscoreName = document.getElementById('highscore-name').value;
  sendRankings();
  grabRankings();
  document.getElementById('submit-score').classList.toggle('hidden');
  document.getElementById('leaderboards').classList.toggle('hidden');
  document.getElementById('game-copy').classList.toggle('hidden');
}, false);

// Called when a difficulty button is pressed
function newGame(difficulty) {
  gameCopy.classList.remove('finishMessage'); //remove finish screen css
  gameCopy.textContent = difficulty;
  gameToArray();
  drawScreen();
  document.getElementById('submit-score').classList.add('hidden');
  document.getElementById('leaderboards').classList.add('hidden');
  document.getElementById('game-copy').classList.remove('hidden');
}

// Convert selected difficulty into array
function gameToArray() {
  currentLocation = 0;
  gameArray = gameCopy.textContent.split('');
  currentLetter = gameArray[currentLocation];
}

// Redraws gamescreen on each correct keypress to highlight the current letter
function drawScreen() {
  if (currentLetter === ' ') {
    gameArray[currentLocation] = '<span class="highlightSpace">' + currentLetter + '</span>';
  } 
  else {
    gameArray[currentLocation] = '<span class="highlight">' + currentLetter + '</span>';
  }
  gameCopy.innerHTML = gameArray.join('');
}

// Displays win screen
function finish() {
  endTime = Date.now();
  totalTime = (endTime - startTime) / 1000;
  lpm = Number((gameArray.length / totalTime).toFixed(2));
  gameCopy.classList.add('finishMessage');
  if (errors === 1) {
    gameCopy.innerHTML = 'You typed <span class="highlight">' + lpm + '</span> letters per second with <span class="highlight">' + errors + '</span> error!';
  }
  else {
    gameCopy.innerHTML = 'You typed <span class="highlight">' + lpm + '</span> letters per second with <span class="highlight">' + errors + '</span> errors!';
  }
  gameStatus = 'finished';
  document.getElementById('submit-score').classList.toggle('hidden');
}

//Grab leaderboard values from server
function grabRankings() {
  var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if(xhr.status === 200) {
        responseObject = JSON.parse(xhr.responseText);
        document.getElementById('rank1Score').textContent = responseObject.leaders[0].score;
        document.getElementById('rank2Score').textContent = responseObject.leaders[1].score;
        document.getElementById('rank3Score').textContent = responseObject.leaders[2].score;
        document.getElementById('rank4Score').textContent = responseObject.leaders[3].score;
        document.getElementById('rank5Score').textContent = responseObject.leaders[4].score;
        document.getElementById('rank1Name').textContent = responseObject.leaders[0].name;
        document.getElementById('rank2Name').textContent = responseObject.leaders[1].name;
        document.getElementById('rank3Name').textContent = responseObject.leaders[2].name;
        document.getElementById('rank4Name').textContent = responseObject.leaders[3].name;
        document.getElementById('rank5Name').textContent = responseObject.leaders[4].name;
      }
    }
  xhr.open('GET', 'http://10.123.17.197:8080/rankings.json', true);
  xhr.send(null);
}
grabRankings();

var highscoreName = '';
var lpm = 0;

function Rank(name, score) {
  this.name = name,
  this.score = score
}

// Send new leaderboard rankings
function sendRankings() {
  var myRank = new Rank(highscoreName, lpm);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://10.123.17.197:8080/submitscore', true);
  xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(myRank));
}

// Keypress listener
document.addEventListener('keypress', function(event) {
  // Check to see if any of the text inputs are in focus
  if (document.getElementById('user-name') === document.activeElement
    || document.getElementById('user-email') === document.activeElement
    || document.getElementById('user-age') === document.activeElement
    || document.getElementById('user-comments') === document.activeElement
    || document.getElementById('highscore-name') === document.activeElement) {
  // Act normally (no preventDefault)
  } else {
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