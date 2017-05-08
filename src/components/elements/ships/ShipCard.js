import React from 'react'
import { connect } from 'react-redux'
import { addShipToSquad } from '../../../state/actions/squadActions'
import { setDrawer } from '../../../state/actions/uiActions'
import glamorous from 'glamorous'
import SVGInline from 'react-svg-inline'
import colors from '../../../constants/colors'
import AddIcon from '../../icons/addIcon'

const StyledCard = glamorous.div({
  display: 'flex',
  flexFlow: 'column',
  padding: '3rem 1rem'
})

const CardHeader = glamorous.div({
  alignItems: 'center',
  display: 'flex'
})

const CardTitle = glamorous.h1({
  color: colors.offWhite,
  fontSize: '1.3rem',
  margin: 0,
  flex: 6
})

const CardBody = glamorous.div({
  display: 'flex',
  flexFlow: 'column',
  marginTop: '1rem'
})

const CardIcon = glamorous.div({
  width: 50,
  marginRight: '1rem',
  display: 'flex',
  '& span': {
    display: 'block'
  },
  '& svg': {
    width: '100%'
  },
  '& path': {
    fill: colors.darkerGrey,
    stroke: 'white',
    strokeWidth: 5
  }
})

const Stats = glamorous.div({
  display: 'flex',
  flexFlow: 'row'
})

const Stat = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  padding: '.25rem',
  borderRadius: '3px',
  border: '1px solid black',
  color: 'white',
  fontSize: '.9rem',
  marginRight: '.5rem',
  '& svg': {
    width: '24px',
    height: '24px',
    marginRight: '.5rem'
  },
}, ({color}) => ({
  borderColor: color,
  '& svg': {
    fill: color
  }
}))

const Actions = glamorous.div({
  display: 'flex',
  marginTop: '1rem',
  padding: '1rem 0'
})

const Action = glamorous.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${colors.offWhite}`,
  padding: '.25rem',
  marginRight: '.5rem',
  borderRadius: '3px',
  '& svg': {
    fill: colors.offWhite
  },
})

const ShipCard = ({card, addShipToSquad, setDrawer}) => {
  const {name, attack, agility, shields, hull, actions} = card
  const strippedShipName = name.replace(/(\([^)]*\))/g, '').replace(/[\W]+/ig, '').toLowerCase()
  const cardImage = require(`../../../../public/svg/ships/${strippedShipName}.svg`)
  const handleClick = () => {
    addShipToSquad(card)
    setDrawer('PilotList')
  }

  return (
    <StyledCard onClick={handleClick}>
      <CardHeader>
        {cardImage &&
          <CardIcon>
            <SVGInline svg={cardImage}/>
          </CardIcon>
        }
        <CardTitle>{card.name}</CardTitle>
        <AddIcon color={colors.accent}/>
      </CardHeader>
      <CardBody>
        <Stats>
          <Stat color={colors['red']}>
            <svg>
              <use href='#Attack'/>
            </svg>
            <span>{attack}</span>
          </Stat>
          <Stat color={colors['green']}>
            <svg>
              <use href='#Agility'/>
            </svg>
            {agility}
          </Stat>
          <Stat color={colors['yellow']}>
            <svg>
              <use href='#Hull'/>
            </svg>
            {hull}
          </Stat>
          <Stat color={colors['blue']}>
            <svg>
              <use href='#Shields'/>
            </svg>
            {shields}
          </Stat>
        </Stats>
        <Actions>
          {actions.map(action => {
            return (
              <Action>
                <svg height="24" width="24">
                  <use href={`#${action}`}/>
                </svg>
              </Action>
            )
          })}
        </Actions>
      </CardBody>
    </StyledCard>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addShipToSquad: (ship) => {
    dispatch(addShipToSquad(ship))
  },
  setDrawer: (drawerContent) => {
    dispatch(setDrawer(drawerContent))
  }
})

const ShipCardWithState = connect(
  null,
  mapDispatchToProps
)(ShipCard)

export default ShipCardWithState
