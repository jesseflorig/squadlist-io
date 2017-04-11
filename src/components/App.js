import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './layout/Header'
import HomePage from './pages/Home'
import ShipPage from './pages/Ships'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>

          <Route exact path="/" component={HomePage}/>
          <Route exact path="/ships" component={ShipPage}/>
        </div>
      </Router>
    )
  }
}

export default App
