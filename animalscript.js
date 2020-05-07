<!DOCTYPE html>

<html>


</head>



<body>




<div id="wrapper">

   <div id="start" class="btn">Start</div>

   <div id="score"></div>

   <div id="message"></div>

   <div id="gameboard"></div>
   
     <text>Turns:<text id ="time001">26</text></text>


   <p id="message001"></p>

   <p id="message002"></p>

    <p id="message003"></p>

   <p id="message004"></p>



</div>



<script>

var tileImages = [];

var tileArray = [];

var tileFlippedOver = [];

var GameScore = 0 ;

var Level = 0;

var cardFlipped = -1;

var timer = '';

var playLockout = false;

var startButton = document.getElementById("start");

var gameBoard = document.getElementById('gameboard');

var gamePlay = false;

var message = document.getElementById('message');







//Event Listeners

startButton.addEventListener('click',startGame)

function gameover(){
startButton.style.display = 'block';
message.innerHTML = "click to start a new game";
gamePlay = false;
tileArray = [];
tileFlippedOver = [];

}

//Functions


function startGame(){

c = 26;


cardFlipped = -1;

playerLockout = false;

startButton.style.display ='none';

if(!gamePlay){

   gamePlay = true;

   buildArray();

   tileArray = tileImages.concat(tileImages); //tile image concat building extra tiles

   shuffleArray(tileArray);

   buildBoard();

   message.innerHTML = "Click any tile";

   }

}



function buildBoard(){

 var html = "";

for(var x = 0; x <= (tileArray.length - 1); x++){



   html += '<div class="gameTile"><div class="gameTile">';
   html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';



}

    gameBoard.innerHTML = html;

}
function isinArray(v,array){

return  array.indexOf(v) > -1;

}

function cardFlip(t,ti){

t.src = "images/" + tileArray[ti];
tileFlippedOver.push(t.id);



}

function hideCard(){
 for(var x=0; x<2; x++){
 var vid = tileFlippedOver.pop();
 document.getElementById(vid).src = "images/back.jpg";

  }

  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;


}

function checkSrc(v){
  var v = document.getElementById(v).src;
  return v;
}

function pickCard(tileIndex, t) {
if(!isinArray(t.id,tileFlippedOver) &&  !playLockout ){
      message.innerHTML = "Check for a Match";

      if (cardFlipped >= 0) {
          cardFlip(t,tileIndex);
          var secondCard = tileIndex;

          playLockout = true;

          //GameScore = GameScore + 1;

          //text("Score:" + GameScore,20,20);



          if(checkSrc(tileFlippedOver[tileFlippedOver.length-1]) == checkSrc(tileFlippedOver[tileFlippedOver.length-2])){

          message.innerHTML ="Match Found. Click more tiles";

          playLockout = false;

          cardFlipped = -1;

          if(tileFlippedOver.length == tileArray.length){

            gameover();

          }

          }else{
          //check if over


          message.innerHTML ="No Match";

          timer = setInterval(hideCard,1000);


         }

      } else {


        cardFlipped = tileIndex;
        cardFlip(t,tileIndex);

        }
      }else{
	        message.innerHTML = "Not clickable";
      }
      function timer001() {
	              c = c - 1;
	              if (c < 26) {
	                  time001.innerHTML = c;
            }
	         if (c < 1) {


                gameover();




	        }
	      }
    update = setInterval(timer001(), 1000);
    }
    function buildArray() {
      for (var x = 1; x < 7; x++) {
        tileImages.push(x + '.jpg');
      }
    }
    function shuffleArray(array) {
      for (var x = array.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var itemValue = array[x];
        array[x] = array[holder];
        array[holder] = itemValue;
      }


      return array;
    }
  </script>
</body>
