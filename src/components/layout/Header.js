import React from 'react'
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
  padding: '.5rem',
  zIndex: '100'
})

const NavList = glamorous.ul({
  margin: 0,
  padding: 0,
  display: 'flex',
  listStyle: 'none'
})

const NavListItem = glamorous.li({
  fontFamily: '"Roboto", sans-serif',
})

class Header extends React.Component {
  render () {
    return (
      <StyledHeader>
        <NavList>
          <NavListItem><LoginButton userQuery={this.props.userQuery}/></NavListItem>
        </NavList>
      </StyledHeader>
    )
  }
}

export default Header
