import React, { Component } from 'react'
import Label from '../Label.js'
import Body from '../Body.js'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleSelected, toggleStarred } from '../../actions'
import { bindActionCreators } from 'redux'

export class Message extends Component {

  render() {

    const { message } = this.props;

    const classes = message.read ? "read" : "unread";
    const checked = message.selected ? "checked" : '';
    const select = message.selected ? "selected" : '';
    const star = message.starred ? "star fa fa-star" : "star fa fa-star-o";

    return (
      <div>
      <div className={`row message ${classes} ${select}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={checked} onClick={()=>this.props.toggleSelected(message.id)}/>
            </div>
            <div className="col-xs-2">
              <i className={star} onClick={()=>this.props.toggleStarred(message.id, message.starred)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { this.props.message.labels.map( (label) => <Label label={label} key={label}/>) }
          <Link to={`/messages/${message.id}`}>
              {this.props.message.subject}
          </Link>
        </div>
      </div>
      <div>
        <Route exact path={`/messages/${message.id}`} component={Body} />
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const message = state.messages.filter(message => message.id===ownProps.id)[0];

  return {
    message,
    id: ownProps.id
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSelected, toggleStarred
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
