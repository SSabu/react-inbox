import React, { Component } from 'react'
import { connect } from 'react-redux'
import { markRead, getMessageBody } from '../actions'
import { bindActionCreators } from 'redux'

class Body extends Component {

  componentDidMount(){
    this.props.getMessageBody(this.props.match.path);
  }

  render() {

    // this.props.markRead([this.props.match.path.split('/')[2]]);

    const { message } = this.props;

    return (
    <div>
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          { message && <p>{message.body}</p> }
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.message,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessageBody, markRead
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body)
