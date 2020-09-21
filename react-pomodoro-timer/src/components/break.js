import React from 'react';

class Break extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 5
      };
      // change code below this line
      this.increment=this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.reset = this.reset.bind(this);
      // change code above this line
    }
    // change code below this line
      increment() {
        this.setState({
          count: this.state.count + 1
        })
      }
  
      decrement() {
        if (this.state.count !== 1) {
          this.setState({
            count: this.state.count - 1
          })
        }
      }
  
      reset() {
        this.setState({
          count:0
        })
      }
  
    // change code above this line
    render() {
      return (
        <div>
        <h1>Break Length </h1>
          <div id="breakbuttons">
          <button className='inc' onClick={this.increment}>+</button>
          <span>{this.state.count}</span>
          <button className='dec' onClick={this.decrement}>-          </button>
           </div>
        </div>
      );
    }
  };
  
//  ReactDOM.render(<Break /> , document.getElementById("break_count"));
export default Break;