import React, {Component, PropTypes} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import List from './List.js'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={List}/>
      </Router>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default App
