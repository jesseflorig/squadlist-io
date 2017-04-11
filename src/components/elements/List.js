import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'
import colors from '../../constants/colors'

const StyledList = glamorous.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const StyledListItem = glamorous.li({
  backgroundColor: colors.grey,
  padding: '1rem',
  fontFamily: '"Roboto", sans-serif',
  '&:not(:last-of-type)': {
    marginBottom: 5
  }
})

const List = ({items}) => {
  return (
    <StyledList>
      {items.map(item => {
        return <StyledListItem>{item.name}</StyledListItem>
      })}
    </StyledList>
  )
}

export default List
