import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

class Canvas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <P5Wrapper sketch={this.props.sketch}></P5Wrapper>
    )
  }
}

export default Canvas;