import React from 'react'
import glamorous from 'glamorous'
import Color from 'color'
import colors from '../../constants/colors'

const StyledSnackBar = glamorous.div({
  position: 'fixed',
  width: '100%',
  bottom: 0,
  left: 0,
  zIndex: 10000,
  padding: '1rem .25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `linear-gradient(
    ${Color(colors.secondary).darken(0.1).hex()},
    ${Color(colors.secondary).darken(0.2).hex()}
  )`
})

const SnackBarItem = glamorous.div({
  fontFamily: 'Roboto',
  display: 'flex',
  alignItems: 'center',
  color: colors.accent,
  '& span': {
    marginLeft: '.25rem'
  }
})

const SnackBar = ({items}) => {
  return (
    <StyledSnackBar>
      {items.map((item, index) => {
        const {onClick, icon, text} = item
        return (
          <SnackBarItem onClick={onClick} key={index}>
            {icon && <span>{icon}</span>}
            {text && <span>{text}</span>}
          </SnackBarItem>
        )
      })}
    </StyledSnackBar>
  )
}

export default SnackBar
