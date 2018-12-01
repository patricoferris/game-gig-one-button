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
                <a key={item.name} href={item.link}><li>{item.name}</li></a>
              ) : (<li key={item}>{item}</li>);
            })
          } </ul> : 
          this.props.content.map((item) => {
            return item.name !== undefined ? (
              <a key={item.name} href={item.link}><p>{item.name}</p></a>
            ) : (<p key={item}>{item}</p>);
          })}
        </div>
      </div>
    );
  }
}

export default ContentCard;