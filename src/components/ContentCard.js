import React, { Component } from 'react';

class ContentCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='content-card'>
        <h1>{this.props.title}</h1>
        {this.props.content.map((item) => {
          return item.name !== undefined ? (
            <p><a key={item.name} href={item.link}>{item.name}</a></p>
          ) : (<p key={item}>{item}</p>);
        })}
      </div>
    );
  }
}

export default ContentCard;