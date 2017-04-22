import React from 'react'
import glamorous from 'glamorous'
import SVGInline from 'react-svg-inline'
import colors from '../../../constants/colors'
import Color from 'color'
import AttackIcon from '../../../../public/svg/icons/attack.svg'
import AgilityIcon from '../../../../public/svg/icons/agility.svg'
import ShieldIcon from '../../../../public/svg/icons/shield.svg'
import HullIcon from '../../../../public/svg/icons/hull.svg'

const StyledCardIcon = glamorous.div({
  width: 150,
  display: 'flex',
  '& span': {
    display: 'block'
  },
  '& svg': {
    height: '100%',
    width: '100%'
  }
})

const StyledCard = glamorous.div({
  display: 'flex',
})

const Stats = glamorous.div({
  display: 'flex',
  flexFlow: 'column',
  marginRight: '1rem'
})

const Stat = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  padding: '.5rem',
  borderRadius: '3px',
  border: '3px solid black',
  color: 'white',
  fontSize: '1.5rem',
  marginBottom: '.5rem',
  '& .SVGInline': {
    width: '24px',
    height: '24px',
    marginRight: '.5rem'
  },
}, ({color}) => ({
  borderColor: Color(color).darken(0.3).hex(),
  backgroundColor: Color(color).darken(0.1).hex(),
  '& path': {
    fill: Color(color).darken(0.5).hex()
  }
}))

const ShipCard = ({card}) => {
  const {name, attack, agility, shields, hull} = card
  const strippedShipName = name.replace(/(\([^)]*\))/g, '').replace(/[\W]+/ig, '').toLowerCase()
  const cardImage = require(`../../../../public/svg/ships/${strippedShipName}.svg`)
  return (
    <StyledCard>
      <Stats>
        <Stat color={colors['red']}>
          <SVGInline svg={AttackIcon}/>
          <span>{attack}</span>
        </Stat>
        <Stat color={colors['green']}>
          <SVGInline svg={AgilityIcon}/>{agility}
        </Stat>
        <Stat color={colors['yellow']}>
          <SVGInline svg={HullIcon}/>{hull}
        </Stat>
        <Stat color={colors['blue']}>
          <SVGInline svg={ShieldIcon}/>{shields}
        </Stat>
      </Stats>
      {cardImage &&
      <StyledCardIcon>
        <SVGInline svg={cardImage}/>
      </StyledCardIcon>
      }
      <h1>{card.name}</h1>
    </StyledCard>
  )
}

export default ShipCard
