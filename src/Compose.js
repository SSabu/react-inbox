import React, { Component } from 'react';

class Compose extends Component {

  constructor(props){
    super(props)
    this.sendMessageClick = this.sendMessageClick.bind(this)
  }

  sendMessageClick(e){
    e.preventDefault();
    var subject = e.target.subject.value;
    var body = e.target.subject.value;
    this.props.sendMessage(subject, body);
  }

  render () {
    return (
      <form className="form-horizontal well" onSubmit={this.sendMessageClick}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>
    )
  }
}

export default Compose;
