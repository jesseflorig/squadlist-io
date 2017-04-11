import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './layout/Header'
import HomePage from './pages/Home'
import ShipsPage from './pages/Ships'
import ShipPage from './pages/Ship'
import glamorous from 'glamorous'

const StyledPage = glamorous.div({
  marginTop: '4rem'
})

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>

          <StyledPage>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/ships" component={ShipsPage}/>
            <Route exact path="/ships/:shipId" component={ShipPage}/>
          </StyledPage>
        </div>
      </Router>
    )
  }
}

export default App
