import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
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
          <Header userQuery={this.props.userQuery} />

          <StyledPage>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/ships" component={ShipsPage}/>
              <Route exact path="/ships/:shipId" component={ShipPage}/>
            </Switch>
          </StyledPage>
        </div>
      </Router>
    )
  }
}

const userQuery = gql`
  query userQuery{
    user{
      id
    }
  }
`

const AppWithData = graphql(userQuery, {
  name: 'userQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(App)

export default AppWithData
