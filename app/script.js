import React from 'react';
import { render } from 'react-dom';
const { timeFormat } = require('./utils/timeFunction');

class App extends React.Component {

  setupTime = {
    workTime : 1200,
    restTime : 20
  }

  state = {
    status : 'off',
    time : 0,
    timer : null
  }

  startTimer = () => {
    this.setState({
      status : 'work',
      time : this.setupTime.workTime,
      timer: setInterval(this.countdown, 1000)
    })
  }

  stopTimer = () => {
    this.setState({
      status : 'off',
      time : 0,
      timer: clearInterval(this.countdown)
    })
  }

  countdown = () => {
    this.setState({
      time: this.state.time - 1,
    })

    if (this.state.time === 0){
      if(this.state.status == 'work'){
        this.setState({
          status : 'rest',
          time : this.setupTime.restTime
        });
        this.playBell();
      } else if (this.state.status =='rest'){
        this.setState({
          status : 'work',
          time : this.setupTime.workTime
        });
        this.playBell();
      }
    }
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  closeApp = () => {
    window.close();
  }
 
  render() {
    
    const { status, time } = this.state;
    
    return (
      <div>
        <h1>Protect your eyes</h1>

        {(status === 'off') && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}

        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}

        {(status !== 'off') && <div className="timer">{timeFormat(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
