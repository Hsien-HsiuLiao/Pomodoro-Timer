export function updateBreakTime(action) {
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
  
export function updateSessionTime(action) {
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