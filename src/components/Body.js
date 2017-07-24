import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessageBody } from '../actions'
import { bindActionCreators } from 'redux'

class Body extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getMessageBody(this.props.id);
  }

  render() {
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
    id: ownProps.match.params.id
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessageBody
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body)
