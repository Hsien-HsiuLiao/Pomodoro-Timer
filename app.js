var breakLength = 5;  //default 5 minutes
var sessionLength = 25; //default 25 minutes
var countDownTimeSeconds = 25 * 60; //default time in seconds
  
  //decrease or increase break length
  //cannot change time while timer on
  //cannot decrease time below 1 min
var timerOn = false;
  
function updateBreakTime(action) {
  switch(action) {
    case "decrease":
      console.log('decrease');
      if ( !timerOn && breakLength > 1 ){
        breakLength--;
//      document.getElementById("breakTime").innerHTML = breakLength;
        };
      break;
    case "increase":
      if ( !timerOn ) {
        breakLength++;
      }
      break;
    default:
      // code block
  };
  document.getElementById("breakTime").innerHTML = breakLength; 
  
};

function updateSessionTime(action) {
  switch(action) {
    case "decrease":
      console.log('decrease');
      if ( !timerOn && sessionLength > 1 ){
        sessionLength--;
        };
      break;
    case "increase":
      if ( !timerOn ) {
        sessionLength++;
      }
      break;
    default:
      // code block
  };
  document.getElementById("sessionTime").innerHTML = sessionLength; 
  document.getElementById("countDownDisplay").innerHTML = sessionLength;
  countDownTimeSeconds=sessionLength*60;

  
};

$(document).ready(function() {
  
  var startSessionAudio = new Audio('./sounds/service-bell.mp3');
  var breakTimeAudio = new Audio('./sounds/musicBox-breakTime.mp3');
  
  /*
  $("#decBreakTime").on("click", () => {
      if ( !timerOn && breakLength > 1 ){
        breakLength--;
        updateBreakTime(breakLength);
      }
    });
  

  
  $("#incBreakTime").on("click", function(){
      if ( !timerOn ) {
        breakLength++;
        updateBreakTime(breakLength);
      }
    });

  function updateBreakTime (time) {
      $("#breakTime").html(time + " min");
    }

    
  //decrease or increase session length
  $("#decSessionTime").on("click", function(){
      if ( !timerOn && sessionLength > 1){
        sessionLength--;

        updateSessionTime (sessionLength);
      //  countDownTimeSeconds = sessionLength*60;
      //  $("#sessionTime").html(sessionLength + " min");
      //  $("#countDownDisplay").html(sessionLength);
      }
      });

  $("#incSessionTime").on("click", function(){
      if ( !timerOn ){
        sessionLength++;

        updateSessionTime (sessionLength);
    //    countDownTimeSeconds= sessionLength*60;
      //  $("#sessionTime").html(sessionLength + " min");
        //$("#countDownDisplay").html(sessionLength);
      }  
     });

  function updateSessionTime (time) {
        countDownTimeSeconds= time*60;
        $("#sessionTime").html(time + " min");
        $("#countDownDisplay").html(time);
  }
*/
  function animateTimeElapsed () {
    //circle timer
    var elem = document.getElementById("timer"); 
    var height = 235;
    var timeElapsed = 0;
    var totalTime = countDownTimeSeconds;
    //if already counting down, don't dec again
    var id = setInterval(decHeightTimerElem, 1000);
    function decHeightTimerElem() {
      if (height <= 20) {
        clearInterval(id);
      } else {
        //height--; 
        //elem.style.height = height + 'px';
        timeElapsed++;
      //  console.log(height*(totalTime-timeElapsed)/totalTime) 
        elem.style.height = (height * (totalTime-timeElapsed)/totalTime) + 'px';
      }
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
        animateTimeElapsed();  
        $("#countDownDisplay").html(countDownTimeSeconds);
      //change circle to red
        document.getElementById("coloredCircle").style.backgroundColor = 'red';
      }
      else if (breakStatus==true){
        breakStatus=false;
        countDownTimeSeconds=sessionLength*60;
        $("#countDownDisplay").html(countDownTimeSeconds);
        startSessionAudio.play();
        $("#timePeriod").html("Session");
        animateTimeElapsed();
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
    if( (clickcount%2) == 1 ){
      startSessionAudio.play();
      intervalID = setInterval(countDownTime, 1000);      
      //intervalID=setInterval(countDownTime, 100); faster testing
      animateTimeElapsed();
      breakStatus=false;
      
    }//end if start/restart click
    else if( (clickcount%2) == 0 ) {
      $("#countDownDisplay").html( Math.trunc(countDownTimeSeconds/60) + ":" + countDownTimeSeconds%60 );
      clearInterval(intervalID);
      timerOn=false;
      }
    }); //end clock onclick
 
});


      
