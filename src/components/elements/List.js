import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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

const List = ({items, link}) => {
  return (
    <StyledList>
      {items.map(item => {
        return (
          <StyledListItem>
            <Link to={`${link}/${item.id}`}>{item.name}</Link>
          </StyledListItem>
        )
      })}
    </StyledList>
  )
}

export default List
