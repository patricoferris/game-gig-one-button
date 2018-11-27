import React, { Component } from 'react';

class ContentCard extends Component {
  render() {
    let divStyle = {gridArea: this.props.title.split(" ")[0].toLowerCase()};
    return (
      <div id={this.props.title.split(" ")[0].toLowerCase()} style={divStyle} className='content-card'>
        <div className='content-card-header'>
          <h1 className='content-title'>{this.props.title}</h1>
        </div>
        <div className='content-card-content'>
          {this.props.bullet ? <ul> {
            this.props.content.map((item) => {
              return item.name !== undefined ? (
                <li><a key={item.name} href={item.link}>{item.name}</a></li>
              ) : (<li key={item}>{item}</li>);
            })
          } </ul> : 
          this.props.content.map((item) => {
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