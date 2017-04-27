import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import Header from './layout/Header'
import HomePage from './pages/Home'
import ShipsPage from './pages/Ships'
import ShipPage from './pages/Ship'
import Modal from './elements/modal/Modal'
import { connect } from 'react-redux'
import { TweenMax, Power4 } from 'gsap'

class App extends React.Component {
  render() {
    const {modal} = this.props
    return (
      <Router>
        <div>
          <Header userQuery={this.props.userQuery} />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/ships" component={ShipsPage}/>
            <Route exact path="/ships/:shipId" component={ShipPage}/>
          </Switch>

          <Modal
            content={modal.content}
            open={modal.open}
          />
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

const mapStateToProps = (state) => ({
  modal: state.ui.modal
})

const AppWithDataAndState = connect(
  mapStateToProps
)(AppWithData)

export default AppWithDataAndState
