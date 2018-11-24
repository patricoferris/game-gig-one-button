import React, { Component } from 'react';

class ModalButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: ["modal"],
      buttonClasses: ["game-gig-button"]
    }

    this.updateModal.bind(this);
  }

  updateModal = () => {
    let newClasses = this.state.classes.concat(["fadeout"]);
    let newIds = this.state.buttonClasses.concat(["pressed"]);
    console.log(newClasses);
    this.setState({
      classes: newClasses,
      buttonClasses: newIds
    });

    this.props.closeModal();
  }

  render() {
    return (
      <div className={this.state.classes.join(" ")}>
        <button className={this.state.buttonClasses.join(" ")} onClick={this.updateModal}><h1>Game Gig 2018</h1></button>
      </div>
    );
  }
}

export default ModalButton;