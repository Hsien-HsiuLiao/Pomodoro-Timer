import { updateBreakTime } from './updateTime.js';
import { updateSessionTime } from './updateTime.js';

var breakLength = 5;  //default 5 minutes
var sessionLength = 25; //default 25 minutes
var countDownTimeSeconds = 25 * 60; //default time in seconds
var animationStarted = false;
  //decrease or increase break length
  //cannot change time while timer on
  //cannot decrease time below 1 min
var timerOn = false;
  /*
function updateBreakTime(action) {
  if ( !timerOn && breakLength > 1 ){
    switch(action) {
    case "decrease":
        breakLength--;
      break;
    case "increase":
        breakLength++;
      break;
 //   default:
    };
  document.getElementById("breakTime").innerHTML = breakLength; 
  };
};

function updateSessionTime(action) {
  if ( !timerOn && sessionLength > 1 ){
    switch(action) {
      case "decrease":
        sessionLength--;
        break;
      case "increase":
        sessionLength++;
        break;
   // default:
    };
  document.getElementById("sessionTime").innerHTML = sessionLength; 
  document.getElementById("countDownDisplay").innerHTML = sessionLength;
  countDownTimeSeconds = sessionLength*60;
  };
};
*/

$(document).ready(function() {  
  var startSessionAudio = new Audio('./sounds/service-bell.mp3');
  var breakTimeAudio = new Audio('./sounds/musicBox-breakTime.mp3');  
 
  var decHeight;
  function animateTimeElapsed (x) {
    //circle timer
    const action = x;
    console.log("action: "+action)
    var elem = document.getElementById("timer"); 
    var height = 235;
    //if clickcount is first time {
    var timeElapsed = 0;
    // }
    var totalTime = countDownTimeSeconds;
    //if already counting down, don't dec again
    console.log("setInterval decHeight");
    if(action === "start"){
      decHeight = setInterval(decHeightTimerElem, 1000);
    }
    if (action === "pause") {
      clearInterval(decHeight);
      console.log("pause");
      decHeight = 0;
      console.log("decHieght: "+ decHeight);
    }
    function decHeightTimerElem() {
      console.log("timercallaction: "+ action)
      //  console.log("start");
        timeElapsed++;
      //  console.log(height*(totalTime-timeElapsed)/totalTime) 
        elem.style.height = (height * (totalTime-timeElapsed)/totalTime) + 'px';
    }
    //end circle timer
  };
  //shows time countdown of Session or Break time
  function countDownTime(){
    timerOn=true;
    countDownTimeSeconds--;
    if (countDownTimeSeconds==0){
      if(breakStatus==false){
        breakStatus=true;
        countDownTimeSeconds=breakLength*60;
        breakTimeAudio.play();
        $("#timePeriod").html("Break time!");
        //reset timer element height
        //document.getElementById("timer").style.height = 235;
        animateTimeElapsed("start");  
        $("#countDownDisplay").html(countDownTimeSeconds);
        document.getElementById("coloredCircle").style.backgroundColor = 'red';
      }
      else if (breakStatus==true){
        breakStatus=false;
        countDownTimeSeconds=sessionLength*60;
        $("#countDownDisplay").html(countDownTimeSeconds);
        startSessionAudio.play();
        $("#timePeriod").html("Session");
        animateTimeElapsed("start");
        document.getElementById("coloredCircle").style.backgroundColor = 'green';
      }
    }// end if countDownTimeSeconds ==0

    else{
      if(countDownTimeSeconds%60 < 10){
        $("#countDownDisplay").html(Math.trunc(countDownTimeSeconds/60)+":0" + countDownTimeSeconds%60)  
      }
      else{
        $("#countDownDisplay").html(Math.trunc(countDownTimeSeconds/60)+":" + countDownTimeSeconds%60);
      }
    }
  }//end countdown

  var clickcount = 2;
  var intervalID = 0;
  $("#clock").on("click", function(){
      //second click should pause countdown, third restart, etc
    clickcount++;
    if( clickcount  === 3 ){
      startSessionAudio.play();
      intervalID = setInterval(countDownTime, 1000);      
      //intervalID=setInterval(countDownTime, 100); faster testing
      console.log("call animate start");
      animateTimeElapsed("start");
      breakStatus=false;      
    }//end if start
    
    //restart click
    else if( (clickcount%2) == 1 && clickcount !== 3){
      intervalID = setInterval(countDownTime, 1000);  
      animateTimeElapsed("start");
      breakStatus=false;      
    }
    else if( (clickcount%2) == 0 ) {
      //pause time displayed and animation
      $("#countDownDisplay").html( Math.trunc(countDownTimeSeconds/60) + ":" + countDownTimeSeconds%60 );
      clearInterval(intervalID);
      animateTimeElapsed("pause");
      timerOn=false;
      }
    }); //end clock onclick
 
});