import React, { Component } from 'react';

class ContentCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.title.split(" ")[0].toLowerCase()} className='content-card'>
        <div className='content-card-header'>
          <h1 className='content-title'>{this.props.title}</h1>
        </div>
        <div className='content-card-content'>
          {this.props.content.map((item) => {
            return item.name !== undefined ? (
              <p><a key={item.name} href={item.link}>{item.name}</a></p>
            ) : (<p key={item}>{item}</p>);
          })}
        </div>
      </div>
    );
  }
}

export default ContentCard;