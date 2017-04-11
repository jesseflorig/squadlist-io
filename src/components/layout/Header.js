import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'

const StyledHeader = glamorous.div({
  backgroundColor: 'black',
  padding: '.5rem'
})

const NavList = glamorous.ul({
  margin: 0,
  display: 'flex',
  listStyle: 'none'
})

const NavListItem = glamorous.li({
  fontFamily: '"Roboto", sans-serif',
  color: 'white',
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
      </StyledHeader>
    )
  }
}

export default Header
