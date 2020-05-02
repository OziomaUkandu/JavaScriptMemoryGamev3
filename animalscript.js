var tileImages = []; // main container for game images
var tileArray = [];
var tileFlippedOver = [];
var cardFlipped = -1;// Starts here cos array's start at 0
var timer = '';
//game timer
var second = 0, minute = 0;
var counter = document.getElementById("counter");
var interval;
var playLockout = false;
var gamePlay = false; // controls if we rebuild the board restart

//hold the elements of our startButton
var startButton = document.getElementById('start');
//hold the elements of our gameBoard
var gameBoard = document.getElementById('gameboard');
//hold the elements of our message
var message = document.getElementById('message');

//event listens(When you click it starts)
startButton.addEventListener('click', startGame);

//when we want to start the game

function startGame() {
  cardFlipped = -1;
  playLockout = false;
  //Dissapears when the button is clicked
  startButton.style.display = 'none';
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(tileArray);
    buildBoard();
    message.innerHTML = "Click any tile";
  }
}


function buildArray() {
  for (var x = 1; x < 9; x++) {
    tileImages.push('image' +x+ '.jpg');
	//loads the images dynamically into an array
  }
}
function buildBoard() {
  var html = "";
  //loops while x is less than or equal to the value in our array
  for (var x = 0; x <= (tileArray.length - 1); x++) {
    //establishes our game tile
	html += '<div class="gameTile"><div class="gameTile">';
    html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
  }
  //uses gameBoard when it's ready
  gameBoard.innerHTML = html;
}

function pickCard(tileIndex, t) {
  if (!isinArray(t.id, tileFlippedOver) && !playLockout) {

    //helps us identify if we've picked our first card  
    if (cardFlipped >= 0) {
      cardFlip(t, tileIndex);
      playLockout = true;
      if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2])) {
        message.innerHTML = "Match Found.  Click more tiles";
        playLockout = false;
        cardFlipped = -1;
		//checks to see if the last 2 images in our array are flipped over
        if (tileFlippedOver.length == tileArray.length) {
          gameover();
        }
      } else {
        message.innerHTML = "No Match";
        timer = setInterval(hideCard, 1000);
      }
    } else {
      cardFlipped = tileIndex;
      cardFlip(t, tileIndex);
    }
  } else {
    message.innerHTML = "Not clickable";
  }
}

function startCounter(){
  interval = setInterval(function(){
  counter.innerHTML = minute+"mins "+second+"secs";
  second++;
  if(second == 60){
  minute++;
  second = 0;
  }
  if(minute == 60){
  hour++;
  minute = 0;
  }
  },1000);
}

function hideCard() {
  for (var x = 0; x < 2; x++) {
	
	//removes last element of the array
    var vid = tileFlippedOver.pop();
	//flips image back onto back.jpg
    document.getElementById(vid).src = "images/back.jpg";
  }
  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;
  message.innerHTML = "Click any tile";
}

function gameover() {
  startButton.style.display = 'block';
  message.innerHTML = "click to start new game";
  gamePlay = false;
  tileImages = [];
  tileFlippedOver = [];
}

function isinArray(v, array) {
  return array.indexOf(v) > -1;
}

function cardFlip(t, ti) {
  t.src = "images/" + tileArray[ti];
  tileFlippedOver.push(t.id);
}

//returns the source in hideCard function
function checkSrc(v) {
  var v = document.getElementById(v).src;
  return v;
}

function shuffleArray(array) {

  //
  for (var x = array.length - 1; x > 0; x--) {
    var holder = Math.floor(Math.random() * (x + 1));
    var itemValue = array[x];
    array[x] = array[holder];
    array[holder] = itemValue;
  }
  return array;
}
