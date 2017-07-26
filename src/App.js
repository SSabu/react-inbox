import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages/Messages.js'
import Message from './components/Message/Message.js'
import Compose from './components/Compose.js'
import Body from './components/Body.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container-fluid">
            <Route path="/" component={Toolbar} />
            <Route exact path="/compose" component={Compose} />
            <Route path="/" component={Messages} />
          </div>
        </div>
      </Router>
      )
  }
}

export default App;
