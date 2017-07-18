import React, { Component } from 'react';
import Toolbar from './Toolbar.js'
import Messages from './Messages.js'
import Compose from './Compose.js'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      composeVisible: false
    }

    this.sendMessage = this.sendMessage.bind(this);

    this.addCompose = this.addCompose.bind(this);

    this.toggleRead = this.toggleRead.bind(this);

    this.checkSelected = this.checkSelected.bind(this);

    this.toggleSelect = this.toggleSelect.bind(this);

    this.toggleProperty = this.toggleProperty.bind(this);

    this.applyLabel = this.applyLabel.bind(this);

    this.removeLabel = this.removeLabel.bind(this);

    this.countUnread = this.countUnread.bind(this);

    this.deleteMessage = this.deleteMessage.bind(this);

  }

  async getMessages() {
    const response = await fetch('http://localhost:8181/api/messages');
    const json = await response.json()
    return json._embedded.messages
  }

  async componentDidMount() {
    const messages = await this.getMessages()
    this.setState({data:messages});
  }

  deleteMessage() {

    this.countUnread();

    let newMessages = [];
    let messagesIds = [];

    this.state.data.forEach(msg => {

      if(msg.selected){
        messagesIds.push(msg.id)
      }

      if(msg.selected && !msg.read){
        this.countUnread();
      }

      if(!msg.selected){
        newMessages.push(msg);
      }
    })

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': messagesIds,
        'command':'delete'
      })
    })
    .then(()=> {
      this.setState({data:newMessages});
    })
  }

  countUnread(){
    let unread = this.state.data.filter(msg => !msg.read);
    return unread.length;
  }

  applyLabel(e){

    e.preventDefault();
    e.persist();

    let newMessages = [];
    let messagesIds = [];

    this.state.data.forEach(msg => {
      if(msg.selected && msg.labels.length===0 && e.target.value==="Apply label") {
        newMessages.push(msg);
      } else if (msg.selected && msg.labels.indexOf(e.target.value)===-1 && e.target.value !=="Apply label") {
        newMessages.push(Object.assign({}, msg, {labels: [...msg.labels, e.target.value] }));
        messagesIds.push(msg.id)
      } else {
        newMessages.push(msg)
      }
    })

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': messagesIds,
        'command':'addLabel',
        'label':e.target.value
      })
    })
    .then(() => {
      this.setState({data:newMessages});
    })
  }

  removeLabel(e){

    e.preventDefault();
    e.persist();

    let newMessages = [];
    let messagesIds = [];

    this.state.data.forEach(msg => {
      if (msg.selected && msg.labels.length ===0){
        newMessages.push(msg);
      } else if (msg.selected && msg.labels.length>0) {
        if(msg.labels.indexOf(e.target.value)>-1 && e.target.value !=="Remove label") {
          msg.labels.slice(msg.labels.indexOf(e.target.value), 1);
          newMessages.push(Object.assign({}, msg, {labels: [...msg.labels]} ));
          messagesIds.push(msg.id)
        }
      } else {
        newMessages.push(msg)
      }
    })

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': messagesIds,
        'command':'removeLabel',
        'label':e.target.value
      })
    })
    .then((response) => {
      console.log(response);
      this.setState({data:newMessages});
    })
  }

  toggleSelect(){
    let check = this.checkSelected();
    if (check === "all") {
      this.setState((prevState)=>{
        prevState.data.map(msg => msg.selected = false)
      })
    }

    if (check === "none" || check === "some") {
      this.setState((prevState) => {
        prevState.data.map(msg => msg.selected = true)
      })
    }
  }

  checkSelected(){
    let checkSelect = this.state.data.filter(msg => msg.selected);
    if (checkSelect.length === this.state.data.length) {
      return "all";
    } else if (checkSelect.length === 0) {
      return "none";
    } else if (checkSelect.length < this.state.data.length) {
      return "some";
    }
  };

  toggleRead(condition) {

    let newMessage = [];
    let messagesIds = [];

    this.state.data.forEach(msg => {
      if(msg.selected) {
        msg.read = condition;
        newMessage.push(msg);
        messagesIds.push(msg.id)
      } else {
        newMessage.push(msg);
      }
    })

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': messagesIds,
        'command':'read',
        'read':condition
      })
    })
    .then(() => {
      this.setState({data:newMessage})
    })
  };

  toggleProperty(mssg, property) {

    this.setState((prevState) => {
      const index = prevState.data.indexOf(mssg);
      return {
        data: [
          ...prevState.data.slice(0, index),
          { ...mssg, [property]: !mssg[property] },
          ...prevState.data.slice(index + 1),
      ]}
    })
  };

  sendMessage(subject, body){

    let newMessages = [];

    let newMessage = {
      id: this.state.data.length+1,
      subject: subject,
      body: body,
      starred: false,
      read: false,
      labels: []
    }

    newMessages = [...this.state.data, newMessage];

    fetch('http://localhost:8181/api/messages', {
      headers: {'accept':'application/json', 'content-type':'application/json'},
      method: 'POST',
      body: JSON.stringify({subject: subject, body: body})
    })
    .then(() => {
      this.setState({data:newMessages, composeVisible:false});
    })
  }

  addCompose(){
    this.setState({composeVisible:!this.state.composeVisible});
  }

  render() {
    return (
      <div className="container-fluid">
        <div>
          <Toolbar toggleRead={this.toggleRead} checkSelected ={this.checkSelected()} toggleSelect={this.toggleSelect} addCompose={this.addCompose} applyLabel={this.applyLabel} removeLabel={this.removeLabel} countUnread={this.countUnread()} deleteMessage={this.deleteMessage}/>

          {this.state.composeVisible  ? <Compose sendMessage={this.sendMessage} /> : null}

          <Messages messages={this.state.data} toggleProperty={this.toggleProperty} />
        </div>
      </div>
    );
  }
}

export default App;
