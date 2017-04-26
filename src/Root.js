import 'babel-polyfill'
import React, {Component} from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import Config from './config.js'
import App from './components/App.js'
import squadReducer from './state/reducers/squadReducer'
import uiReducer from './state/reducers/uiReducer'

const graphCoolKey = Config.get().graphcool.key
const networkInterface = createNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/${graphCoolKey}`
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  }
}])

const client = new ApolloClient({
  networkInterface,
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    squad: squadReducer,
    ui: uiReducer
  }),
  {},
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default class Root extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <App/>
      </ApolloProvider>
    )
  }
}
