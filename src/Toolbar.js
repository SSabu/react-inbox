import React, { Component } from 'react';

class Toolbar extends Component {

  render() {

    let box;

    if(this.props.checkSelected === 'some') {
      box = "fa fa-minus-square-o";
    } else if (this.props.checkSelected === 'none') {
      box = "fa fa-square-o";
    } else if (this.props.checkSelected === 'all') {
      box = "fa fa-check-square-o";
    }

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.countUnread}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={()=>this.props.addCompose()}>
            <i className="fa fa-plus"></i>
          </a>

    <button className="btn btn-default">
      <i className={box} onClick={()=>this.props.toggleSelect()} ></i>
    </button>

    <button className="btn btn-default" onClick={()=>this.props.toggleRead(true)} disabled={this.props.checkSelected==='none'} >
      Mark As Read
    </button>

    <button className="btn btn-default" onClick={()=>this.props.toggleRead(false)} disabled={this.props.checkSelected==='none'}>
      Mark As Unread
    </button>

    <select className="form-control label-select" onChange={(e)=>this.props.applyLabel(e)} disabled={this.props.checkSelected==='none'}>
      <option>Apply label</option>
      <option value="dev" >dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select" onChange={(e)=>this.props.removeLabel(e)} disabled={this.props.checkSelected==='none'}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default" onClick={()=>this.props.deleteMessage()} disabled={this.props.checkSelected==='none'}>
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
    )
  }
}

export default Toolbar;
