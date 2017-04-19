import React from 'react'
import glamorous from 'glamorous'

const SelectContainer = glamorous.div({
  position: 'relative'
}, (props) => ({
  width: props.width || 200
}))

const StyledSelect = glamorous.select({
  border: '1px solid black',
  appearance: 'none',
  padding: '1rem .5rem',
  fontSize: '1rem',
  position: 'relative',
  width: '100%'
})

const StyledIndicator = glamorous.span({
  position: 'absolute',
  right: 10,
  bottom: 10,
  borderTop: '14px solid black',
  borderRight: '8px solid transparent',
  borderBottom: '8px solid transparent',
  borderLeft: '8px solid transparent'
})

const Select = ({children, onChange, width}) => {
  return (
    <SelectContainer width={width}>
      <StyledSelect onChange={onChange}>
      {children}
      </StyledSelect>
      <StyledIndicator/>
    </SelectContainer>
  )
}

export default Select
