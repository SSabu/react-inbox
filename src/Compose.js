import React, { Component } from 'react';

class Compose extends Component {

  constructor(props){
    super(props)

    this.state = {
      newMessage: {subject: '', body: ''}
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({target}) {
    const {name,value} = target;
    this.setState( {newMessage: {...this.state.newMessage, [name]:value}})
  }

  sendMessage(e){
    e.preventDefault();

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'POST',
      body: JSON.stringify(this.state.newMessage)
    })
    .then(() => {
    })
  }

  render () {
    return (
      <form className="form-horizontal well" onSubmit={this.sendMessage}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" value={this.state.subject} onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" value={this.state.body} onChange={this.handleChange} ></textarea>
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
