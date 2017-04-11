import 'babel-polyfill'
import React, {Component} from 'react'
import { Route } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import Config from './config.js'
import App from './components/App.js'

const graphCoolKey = Config.get().graphcool.key
const networkInterface = createNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/${graphCoolKey}`
})
const client = new ApolloClient({
  networkInterface,
})

export default class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    )
  }
}
