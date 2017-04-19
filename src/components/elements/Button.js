import React from 'react'
import glamorous from 'glamorous'
import colors from '../../constants/colors'
import Color from 'color'

const ButtonColors = props => ({
  backgroundColor: colors[props.type],
  '&:hover': {
    backgroundColor: Color(colors[props.type]).darken(0.1).hex()
  }
})

const ButtonSize = props => ({
  padding: props.size === 'small' ? '.25rem .5rem' : '1rem',
  fontSize: props.size === 'samll' ? '.6rem' : '1rem'
})

const ButtonWithStyles = glamorous.button({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  border: 'none',
  borderRadius: '3px',
  color: 'white',
  fontFamily: '"Roboto", sans-serif',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 150ms ease-out',
  '& svg': {
    marginRight: '.5rem'
  }
}, ButtonColors, ButtonSize)

const Button = ({text, onClick, type, size, icon}) => {
  return (
    <ButtonWithStyles type={type} size={size} onClick={onClick}>
      {icon && icon}
      {text}
    </ButtonWithStyles>
  )
}

export default Button
