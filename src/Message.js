import React, { Component } from 'react';
import Label from './Label.js';

class Message extends Component {

  constructor(props) {
    super(props);

    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleStarred = this.toggleStarred.bind(this);
  }

  toggleStarred(){
    let message = this.props.message;
    this.props.toggleProperty(message, 'starred');
  }

  toggleSelected() {
    let message = this.props.message;
    this.props.toggleProperty(message, 'selected' );
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
              <input type="checkbox" checked={checked} onClick={this.toggleSelected}/>
            </div>
            <div className="col-xs-2">
              <i className={star} onClick={this.toggleStarred}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { this.props.message.labels.map( (label) => <Label label={label} key={label}/>) }
            <a href="#">
              {this.props.message.subject}
            </a>
        </div>
      </div>
    )
  }
}

export default Message;
