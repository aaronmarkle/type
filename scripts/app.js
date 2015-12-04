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
}, false);

var highscoreButton = document.getElementById('highscore-btn');
highscoreButton.addEventListener('click', function() {
  this.blur();
  highscoreName = document.getElementById('highscore-name').value;
  update();
}, false);

// Called when a difficulty button is pressed
function newGame(difficulty) {
  gameCopy.classList.remove('finishMessage'); //remove finish screen css
  gameCopy.textContent = difficulty;
  gameToArray();
  drawScreen();
  document.getElementById('submit-score').classList.add('hidden');
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

//Update Leaderboard
function update() {
  var leaderscore1 = document.getElementById('rank1Score');
  var leaderscore2 = document.getElementById('rank2Score');
  var leaderscore3 = document.getElementById('rank3Score');
  var leaderscore4 = document.getElementById('rank4Score');
  var leaderscore5 = document.getElementById('rank5Score');
  var leadername1 = document.getElementById('rank1Name');
  var leadername2 = document.getElementById('rank2Name');
  var leadername3 = document.getElementById('rank3Name');
  var leadername4 = document.getElementById('rank4Name');
  var leadername5 = document.getElementById('rank5Name');

  var rank1 = new Rank(leadername1.textContent, Number(leaderscore1.textContent));
  var rank2 = new Rank(leadername2.textContent, Number(leaderscore2.textContent));
  var rank3 = new Rank(leadername3.textContent, Number(leaderscore3.textContent));
  var rank4 = new Rank(leadername4.textContent, Number(leaderscore4.textContent));
  var rank5 = new Rank(leadername5.textContent, Number(leaderscore5.textContent));

  var myRank = new Rank(highscoreName, lpm);
  console.log(myRank.name + myRank.score);

  var rankings = [rank1, rank2, rank3, rank4, rank5, myRank];
  rankings.sort(function (a,b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });


  console.log(rankings);





  if (myRank.score > rankings[0]) {
    rankings.splice(0, 0, lpm);
  } else if (myRank.score > rankings[1]) {
    rankings.splice(1, 0, lpm);
  } else if (myRank.score > rankings[2]) {
    rankings.splice(2, 0, lpm);
  } else if (myRank.score > rankings[3]) {
    rankings.splice(3, 0, lpm);
  } else if (myRank.score > rankings[4]) {
    rankings.splice(4, 0, lpm);
  }
  leaderscore1.textContent = rankings[0];
  leaderscore2.textContent = rankings[1];
  leaderscore3.textContent = rankings[2];
  leaderscore4.textContent = rankings[3];
  leaderscore5.textContent = rankings[4];
}

function Rank(name, score) {
  this.name = name,
  this.score = score;
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