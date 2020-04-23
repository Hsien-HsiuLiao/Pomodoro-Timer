$(document).ready(function() {
  break_val=5;
  var audiofile = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  session_len=25;
  count=session_len*60;
  //decrease or increase break length
  //cannot change time while timer on
  var timer_on=false;
    $("#dec_break").on("click", function(){
      if (timer_on==false && break_val>1){
        break_val--;
        $(".break").html(break_val+" min");
      }
    });
  
    $("#inc_break").on("click", function(){
      if (timer_on==false){
        break_val++;
      $(".break").html(break_val+ " min");
      }
    });
  //dec or inc session
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
    
  $("#count_button").on("click", function(){
      //second click should pause countdown, third restart, etc
    clickcount++;
   
    
    if((clickcount%2)==1){
      audiofile.play();
    //setInterval(show_countdown, 1000);
        intervalID=setInterval(show_countdown, 1000);
      
      //intervalID=setInterval(show_countdown, 100); faster testing
      //progress bar
      var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 1000);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
      //progress bar
      
    break_status=false;
    
    function show_countdown(){
      timer_on=true;
      count--;
      if (count==0){
        if(break_status==false){
          break_status=true;
          count=break_val*60;
          $(".current_status").html("Break!");
        $(".countdown").html(count);
        }
        else if (break_status==true){
          break_status=false;
          count=session_len*60;
          $(".countdown").html(count);
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
    else if((clickcount%2)==0){
        $(".countdown").html(Math.trunc(count/60)+":" + count%60);
      clearInterval(intervalID);
      timer_on=false;
     // alert(intervalID);
      }
    }); //end onclick
  //audio
  myAudio=document.getElementById('audio2');
  myAudio.addEventListener('canplaythrough', function() {
    this.currentTime = 12;
    this.play();
  });
  //end audio
  //start progress
 
  
  
});
      
