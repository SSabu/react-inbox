import React, { Component } from 'react';
import Toolbar from './Toolbar.js'
import Messages from './Messages.js'
import messages from './seeds.json';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: messages
    }

    this.toggleRead = this.toggleRead.bind(this);

    this.checkSelected = this.checkSelected.bind(this);

    this.toggleSelect = this.toggleSelect.bind(this);

    this.toggleProperty = this.toggleProperty.bind(this);

    this.applyLabel = this.applyLabel.bind(this);

    this.removeLabel = this.removeLabel.bind(this);

    this.countUnread = this.countUnread.bind(this);

    this.deleteMessage = this.deleteMessage.bind(this);

  }

  deleteMessage() {
    this.countUnread();
    let newMessages = [];
    this.state.data.forEach(msg => {
      if(!msg.selected){
        newMessages.push(msg);
      }
    })
    this.setState({data:newMessages})
  }

  countUnread(){
    let unread = this.state.data.filter(msg => !msg.read);
    return unread.length;
  }

  applyLabel(e){

    e.preventDefault();
    e.persist();

    let newMessages = [];

    this.state.data.forEach(msg => {
      if(msg.selected && msg.labels.length===0 && e.target.value==="Apply label") {
        newMessages.push(msg);
      } else if (msg.selected && msg.labels.indexOf(e.target.value)===-1 && e.target.value !=="Apply label") {
          newMessages.push(Object.assign({}, msg, {labels: [...msg.labels, e.target.value] }));
        } else {
        newMessages.push(msg)
      }
    })
    this.setState({data:newMessages});
  }

  removeLabel(e){
    e.preventDefault();
    e.persist();
    let newMessages = [];
    this.state.data.forEach(msg => {
      if(msg.selected && msg.labels.length>0) {
        if(msg.labels.indexOf(e.target.value)>-1 && e.target.value !=="Remove label") {
          msg.labels.splice(msg.labels.indexOf(e.target.value), 1);
          newMessages.push(Object.assign({}, msg, {labels: [...msg.labels]} ));
        }
      } else {
        newMessages.push(msg)
      }
    })
    this.setState({data:newMessages});
  }

  toggleSelect(){
    let check = this.checkSelected();
    if (check === "all") {
      this.setState((prevState)=>{
        prevState.data.map(msg => {
          msg.selected = false;
        })
      })
    }

    if (check === "none" || check === "some") {
      this.setState((prevState) => {
        prevState.data.map(msg => {
          msg.selected = true;
        })
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
    this.state.data.forEach(msg => {
      if(msg.selected) {
        msg.read = condition;
        newMessage.push(msg);
      } else {
        newMessage.push(msg);
      }
    })
      this.setState({data:newMessage})
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

  render() {
    return (
      <div className="container-fluid">
        <div>
          <Toolbar toggleRead={this.toggleRead} markUnread={this.markUnread} checkSelected ={this.checkSelected()} toggleSelect={this.toggleSelect} applyLabel={this.applyLabel} removeLabel={this.removeLabel} countUnread={this.countUnread()} deleteMessage={this.deleteMessage}/>

          <Messages messages={this.state.data} toggleProperty={this.toggleProperty} />
        </div>
      </div>
    );
  }
}

export default App;
