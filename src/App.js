import React, { Component } from 'react';

import ModalButton from './components/ModalButton';

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalButton: true
    }

    this.closeModal.bind(this);
  }

  closeModal = () => {
    setTimeout(() => {
      this.setState({
        modalButton: false
      });
    }, 500);
  }

  render() {
    return (
      <div className="App">
        {true ? <ModalButton closeModal={this.closeModal}></ModalButton> : null}
      </div>
    );
  }
}

export default App;
