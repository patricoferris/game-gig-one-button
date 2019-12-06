import React, { Component } from 'react';
const endTime = new Date('December 6, 2019 19:30:00');

class Countdown extends Component {
  constructor() {
    super();
    this.state = {
      timeRemaining: this.secondsToHours((endTime - (new Date())) / 1000)
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  secondsToHours(sec) {
    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));

    if (hours < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+'  :  '+minutes+'  :  '+seconds;
  }

  updateTime = () => {
    this.setState({
      timeRemaining: this.secondsToHours((endTime - (new Date())) / 1000)
    })
  }

  render() {
    return (
      <div className='clock'>{this.state.timeRemaining} </div>
    )
  }
}

export default Countdown;