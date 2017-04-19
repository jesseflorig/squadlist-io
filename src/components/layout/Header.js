import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import LoginButton from '../elements/LoginButton'

const StyledHeader = glamorous.div({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'black',
  padding: '.5rem'
})

const NavList = glamorous.ul({
  margin: 0,
  padding: 0,
  display: 'flex',
  listStyle: 'none'
})

const NavListItem = glamorous.li({
  fontFamily: '"Roboto", sans-serif',
  '& a': {
    color: 'white',
    textDecoration: 'none'
  },
  '&:not(:last-of-type)': {
    marginRight: '.5rem'
  }
})

class Header extends React.Component {
  render () {
    return (
      <StyledHeader>
        <NavList>
          <NavListItem><Link to="/">Home</Link></NavListItem>
          <NavListItem><Link to="/ships">Ships</Link></NavListItem>
        </NavList>

        <NavList>
          <NavListItem><LoginButton userQuery={this.props.userQuery}/></NavListItem>
        </NavList>
      </StyledHeader>
    )
  }
}

export default Header
