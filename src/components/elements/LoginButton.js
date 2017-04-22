import React from 'react'
import Auth0Lock from 'auth0-lock'
import Config from '../../config.js'
import Button from './Button'
import PersonIcon from '../icons/personIcon'
import { withRouter } from 'react-router'
import { gql, withApollo } from 'react-apollo'

const {clientID, domain} = Config.get().auth

class LoginButton extends React.Component {

  constructor (props) {
    super(props)
    this._lock = new Auth0Lock(clientID, domain)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount () {
    this._lock.on('authenticated', res => {
      window.localStorage.setItem('auth0IdToken', res.idToken)
      if (this.props.userQuery) {
        this.props.userQuery.refetch().then( r => {
          const {user} = r.data
          if (user) {
            this.props.history.replace('/')
          } else {
            this.createUser().then(() => {
              this.props.userQuery.refetch().then(() => {
                this.props.history.replace('/')
              })
            })
          }
        })
      }
    })
  }

  handleLogin () {
    this._lock.show()
  }

  handleLogout () {
    window.localStorage.removeItem('auth0IdToken')
    this.props.client.resetStore()
  }

  createUser () {
    return this.props.client.mutate({
      mutation: gql`
        mutation createUser($idToken: String!){
          createUser(authProvider: {auth0: {idToken: $idToken}}) {
            id
          }
        }
      `,
      variables: {
        idToken: window.localStorage.getItem('auth0IdToken')
      }
    })
  }

  render () {
    const label = this.props.userQuery.user ? 'logout' : 'login'
    const handleClick = this.props.userQuery.user ? this.handleLogout : this.handleLogin

    if (!this.props.userQuery.loading) {
      return(
        <Button
          text={label}
          type="primary"
          size="small"
          icon={<PersonIcon color='white'/>}
          onClick={handleClick}/>
      )
    }

    return <div></div>
  }
}

export default withRouter(withApollo(LoginButton))
