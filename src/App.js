import React, { Component } from 'react';

import schedule from './data/Schedule';
import tutorials from './data/Tutorials';
import involved from './data/Involved';
import rules from './data/Rules';

import logo from './data/logo.png';

import ModalButton from './components/ModalButton';
import ContentCard from './components/ContentCard';
import Countdown from './components/Countdown';
import Canvas from './components/Canvas';
import Sketch from './Sketch';

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalButton: true,
      contentCards: [schedule, tutorials, involved, rules],
      bigEnough: true
    }

    this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setBigEnough();
    window.addEventListener('resize', this.setBigEnough.bind(this));
  }

  setBigEnough() {
    if(window.innerWidth < 1000) {
      this.setState({
        bigEnough: false
      })
    } else {
      this.setState({
        bigEnough: true
      })
    }
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({
        modalButton: false
      });
    }, 750);
  }

  

  render() {
    return (
      <div className="App">
        {this.state.bigEnough ? <Canvas sketch={Sketch}></Canvas> : <img alt='Game Gig 2018' width='100%' src={logo}></img>}
        {this.state.modalButton ? <ModalButton closeModal={this.closeModal}></ModalButton> : null}
        
        <div className='main-content'>
          <Countdown></Countdown>
          {this.state.contentCards.map(({ title, bullet, content }) => {
            return (
            <ContentCard key={title} title={title} bullet={bullet} content={content}></ContentCard>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
