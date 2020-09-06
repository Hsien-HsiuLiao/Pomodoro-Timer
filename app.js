$(document).ready(function() {
  
  var audiofile = new Audio('./sounds/service-bell.mp3');
  break_val=5;
  session_len=25;
  count=session_len*60;
  
  //decrease or increase break length
  //cannot change time while timer on
  var timer_on=false;
  $("#decBreakTime").on("click", function(){
      if ( !timer_on && break_val > 1 ){
        break_val--;
        updateBreakTime(break_val);
      }
    });
  
  $("#inc_break").on("click", function(){
      if ( !timer_on ) {
        break_val++;
        updateBreakTime(break_val);
      }
    });

  function updateBreakTime (time) {
      $("#breakTime").html(time+ " min");
    }
  //decrease or increase session length
  $("#dec_sess").on("click", function(){
      if (timer_on==false && session_len>1){
        session_len--;
        count=session_len*60;
        $(".session").html(session_len +" min");
        $(".countdown").html(session_len);
      }
      });
  $("#inc_sess").on("click", function(){
      if (timer_on==false){
        session_len++;
        count=session_len*60;
        $(".session").html(session_len +" min");
        $(".countdown").html(session_len);
      }  
     });
  
  var clickcount=2;
  var intervalID=0;
    
  $("#clock").on("click", function(){
      //second click should pause countdown, third restart, etc
    clickcount++;
   
    
    if((clickcount%2)==1){
      audiofile.play();
    //setInterval(show_countdown, 1000);
        intervalID=setInterval(show_countdown, 1000);
      
      //intervalID=setInterval(show_countdown, 100); faster testing
      /*
      //progress bar
      var elem = document.getElementById("myBar");   
      var width = 0;
      var barTimer = 0;
      var totalTime = count;
      var id = setInterval(frame, 1000);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
      
        } else {
            barTimer++;
            width=(barTimer/totalTime)*100; 
            elem.style.width = width + '%'; 
          }
      }
      //progress bar
      */
      //circle timer
      var elem = document.getElementById("timer"); 
      var height = 235;
      var timeElapsed = 0;
      var totalTime = count;
      var id = setInterval(frame, 1000);
      function frame() {
        if (height <= 20) {
          clearInterval(id);
        } else {
          //height--; 
          //elem.style.height = height + 'px';
          timeElapsed++;
          console.log(height*(totalTime-timeElapsed)/totalTime) 
          elem.style.height = (height*(totalTime-timeElapsed)/totalTime) + 'px';
        }
      }
  //end circle timer
      
    break_status=false;
      //shows time countdown of Session or Break time
    function show_countdown(){
      timer_on=true;
      count--;
      if (count==0){
        if(break_status==false){
          break_status=true;
          count=break_val*60;
          audiofile.play();
          $(".current_status").html("Break time!");
          $(".countdown").html(count);
          //change circle to red
          document.getElementById("greenCircle").style.backgroundColor = 'red';
        }
        else if (break_status==true){
          break_status=false;
          count=session_len*60;
          $(".countdown").html(count);
          audiofile.play();
          $(".current_status").html("Session");
        }
      }// end if count ==0
      else{
        if(count%60<10){
          $(".countdown").html(Math.trunc(count/60)+":0" + count%60)  
        }
        else{
          $(".countdown").html(Math.trunc(count/60)+":" + count%60);
        }
      }
    }//end showcountdown
    }//end if start/restart click
    else if((clickcount%2)==0) {
      $(".countdown").html(Math.trunc(count/60)+":" + count%60);
      clearInterval(intervalID);
      timer_on=false;
      }
    }); //end onclick
  
    
  //start progress  

 
});
/*
 //move
 function move() {
  var elem = document.getElementById("timer"); 
  var height = 235;
  var id = setInterval(frame, 100);
  function frame() {
      if (height <= 20) {
          clearInterval(id);
      } else {
          height--; 
          elem.style.height = height + 'px'; 
      }
  }
}
*/

      
