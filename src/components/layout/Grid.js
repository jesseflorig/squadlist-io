import React from 'react'
import glamorous from 'glamorous'

const StyledGrid = glamorous.div({
  display: 'flex'
}, (props) => ({
  '& > div': {
    '&:not(:last-of-type)': {
      marginRight: props.gutters
    }
  }
}))

const Grid = ({gutters, children}) => {
  return (
    <StyledGrid gutters={gutters}>
      {children}
    </StyledGrid>
  )
}

export default Grid
