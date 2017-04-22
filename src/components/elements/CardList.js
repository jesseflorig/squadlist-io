import React from 'react'
import glamorous from 'glamorous'
import colors from '../../constants/colors'
import ShipCard from './ships/ShipCard'

const StyledCardList = glamorous.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const StyledCard = glamorous.li({
  backgroundColor: colors.grey,
  padding: '1rem',
  fontFamily: '"Roboto", sans-serif',
  '&:not(:last-of-type)': {
    marginBottom: 5
  }
})

const TemplateMap = (template, item) => {
  const templates = {
    ship: <ShipCard card={item}/>
  }

  return templates[template]
}

const CardList = ({cards, template}) => {
  return (
    <StyledCardList>
      {cards && cards.map(item => {
        return (
          <StyledCard key={item.id}>
            {TemplateMap(template, item)}
          </StyledCard>
        )
      })}
    </StyledCardList>
  )
}

export default CardList
