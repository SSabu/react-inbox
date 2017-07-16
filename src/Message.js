import React, { Component } from 'react';
import Label from './Label.js';

class Message extends Component {

  constructor(props) {
    super(props);

    this.toggleStarred = this.toggleStarred.bind(this);
  }

  toggleStarred(){

    let currentStar = !this.props.message.starred;

    let messagesId = [this.props.message.id];

    let message = this.props.message;

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': messagesId,
        'command':'star',
        'star':currentStar
      })
    })
    .then( () => {
      this.props.toggleProperty(message, 'starred');
  })
}

  render() {

    const classes = this.props.message.read ? "read" : "unread";
    const checked = this.props.message.selected ? "checked" : '';
    const select = this.props.message.selected ? "selected" : '';
    const star = this.props.message.starred ? "star fa fa-star" : "star fa fa-star-o";

    return (
      <div className={`row message ${classes} ${select}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={checked} onClick={()=>this.props.toggleProperty(this.props.message, 'selected')}/>
            </div>
            <div className="col-xs-2">
              <i className={star} onClick={this.toggleStarred}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { this.props.message.labels.map( (label) => <Label label={label} key={label}/>) }
            <a href="subject">
              {this.props.message.subject}
            </a>
        </div>
      </div>
    )
  }
}

export default Message;
