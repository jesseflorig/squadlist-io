import React from 'react'
import glamorous from 'glamorous'

const GridItemWidth = props => ({
  flexBasis: props.width
})

const StyledGridItem = glamorous.div({
  position: 'relative'
}, GridItemWidth)

const GridItem = ({width, children}) => {
  return (
    <StyledGridItem width={width}>
      {children}
    </StyledGridItem>
  )
}

export default GridItem
