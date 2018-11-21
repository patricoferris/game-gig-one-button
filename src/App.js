import React, { Component } from 'react';

import schedule from './data/Schedule';
import tutorials from './data/Tutorials';
import involved from './data/Involved';
import rules from './data/Rules';

import ModalButton from './components/ModalButton';
import ContentCard from './components/ContentCard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalButton: true,
      contentCards: [schedule, tutorials, involved, rules]
    }

    this.closeModal.bind(this);
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
        {this.state.modalButton ? <ModalButton closeModal={this.closeModal}></ModalButton> : null}
        <div>
          <h1>GAME GIG 2018</h1>
        </div>
        <div className='main-content'>
          {this.state.contentCards.map(({ title, content }) => {
            return (
            <ContentCard key={title} title={title} content={content}></ContentCard>
            );
          })}
          
        </div>
      </div>
    );
  }
}

export default App;
