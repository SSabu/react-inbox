import React, { Component } from 'react'
import { connect } from 'react-redux'
import { markRead, markUnread, applyLabel, removeLabel, toggleSelectOn, toggleSelectOff, deleteMessages } from '../actions'
import { bindActionCreators } from 'redux'

class Toolbar extends Component {

  constructor(props){
    super(props)

  this.toggleMultipleSelect = this.toggleMultipleSelect.bind(this);
  this.countUnread = this.countUnread.bind(this);
  this.clickToCompose = this.clickToCompose.bind(this);
  }

  countUnread(){
    let unread = this.props.messages.filter(msg => !msg.read);
    return unread.length;
  }

  checkApplyLabel(messageIds, e) {
    if (e.target.value !== "Apply label") {
      this.props.applyLabel(messageIds, e.target.value)
    } else {
      return;
    }
  }

  checkRemoveLabel(messageIds, e){
    if (e.target.value!=="Remove label") {
      this.props.removeLabel(messageIds, e.target.value)
    } else {
      return;
    }
  }

  checkSelected(){
      let checkSelect = this.props.messages.filter(msg => msg.selected);
      if (checkSelect.length === this.props.messages.length) {
        return "fa fa-check-square-o";
      } else if (checkSelect.length === 0) {
        return "fa fa-square-o";
      } else if (checkSelect.length < this.props.messages.length) {
        return "fa fa-minus-square-o";
      }
    }

  toggleMultipleSelect(){
    let checkSelect = this.props.messages.filter(msg => msg.selected);
    if (checkSelect.length === this.props.messages.length) {
      this.props.toggleSelectOff();
    } else if (checkSelect.length === 0 ) {
      this.props.toggleSelectOn();
    } else if (checkSelect.length < this.props.messages.length) {
      this.props.toggleSelectOn();
    }
  }

  clickToCompose(e) {
    e.preventDefault();
    if (this.props.location.pathname==='/') {
      this.props.history.push('/compose')
    } else {
      this.props.history.push('/')
    }
  }

  render() {

    const { messageIds } = this.props

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.countUnread()}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={this.clickToCompose}>
            <i className="fa fa-plus"></i>
          </a>

    <button className="btn btn-default">
      <i className={this.checkSelected()} onClick={this.toggleMultipleSelect} ></i>
    </button>

    <button className="btn btn-default" onClick={()=>this.props.markRead(messageIds)} disabled={this.props.checkSelected==='none'} >
      Mark As Read
    </button>

    <button className="btn btn-default" onClick={()=>this.props.markUnread(messageIds)} disabled={this.props.checkSelected==='none'}>
      Mark As Unread
    </button>

    <select className="form-control label-select" onChange={(e)=>this.checkApplyLabel(messageIds, e)} disabled={this.props.checkSelected==='none'}>
      <option>Apply label</option>
      <option value="dev" >dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select" onChange={(e)=>this.checkRemoveLabel(messageIds, e)} disabled={this.props.checkSelected==='none'}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default" onClick={()=>this.props.deleteMessages(messageIds)} disabled={this.props.checkSelected==='none'}>
      <i className="fa fa-trash-o"></i>
    </button>
    </div>
  </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const messageIds = state.messages.filter(message => message.selected)
  .map(message => message.id);

  const messages = state.messages;

  return {
    messageIds,
    messages
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  markRead, markUnread, applyLabel, removeLabel, toggleSelectOn, toggleSelectOff, deleteMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
