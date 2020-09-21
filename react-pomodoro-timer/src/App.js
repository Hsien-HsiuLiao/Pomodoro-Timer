import React from 'react';
import Break from './components/break';

import './App.css';

function App() {
  return (
    <div className="App">
      
{/*      <header className="App-header"> </header> */}

<div id="title"><h1>Pomodoro Clock</h1></div>
<div id="breaksess-container">
  {/* <div id="break_count"></div> */}
  <Break />
  <div id="sess_count">Session</div>
</div>
<div id="timer">timer</div>
<div id="start-stop-reset">buttons</div>
<a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
  Pomodoro technique</a>
<p>
<span>There are six steps in the original technique:

  <ol>Decide on the task to be done.</ol>
  <ol>Set the pomodoro timer (traditionally to 25 minutes).[1]</ol>
  <ol>Work on the task.</ol>
  <ol>End work when the timer rings and put a checkmark on a piece of paper.[5]</ol>
<ol>If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.</ol>
<ol>After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.</ol>
  </span>  
     </p>
    </div>
  );
}

export default App;
