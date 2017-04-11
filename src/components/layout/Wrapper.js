import React from 'react'
import glamorous from 'glamorous'

const StyledWrapper = glamorous.div({
  maxWidth: 1180,
  margin: '0 auto'
})

const Wrapper = ({children}) => {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}

export default Wrapper
