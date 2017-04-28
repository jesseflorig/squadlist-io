import React from 'react'
import { connect } from 'react-redux'
import { addShipToSquad } from '../../../state/actions/squadActions'
import { setModal } from '../../../state/actions/uiActions'
import glamorous from 'glamorous'
import SVGInline from 'react-svg-inline'
import colors from '../../../constants/colors'
import AddIcon from '../../icons/addIcon'
import AttackIcon from '../../../../public/svg/icons/attack.svg'
import AgilityIcon from '../../../../public/svg/icons/agility.svg'
import ShieldIcon from '../../../../public/svg/icons/shield.svg'
import HullIcon from '../../../../public/svg/icons/hull.svg'

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

const AddIconStyled = glamorous.div({
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
  '& .SVGInline': {
    width: '24px',
    height: '24px',
    marginRight: '.5rem'
  },
}, ({color}) => ({
  borderColor: color,
  '& path': {
    fill: color
  }
}))

const ShipCard = ({card, addShipToSquad, setModal}) => {
  const {name, attack, agility, shields, hull} = card
  const strippedShipName = name.replace(/(\([^)]*\))/g, '').replace(/[\W]+/ig, '').toLowerCase()
  const cardImage = require(`../../../../public/svg/ships/${strippedShipName}.svg`)

  const handleClick = () => {
    addShipToSquad(card)
    setModal()
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
      </CardBody>
    </StyledCard>
  )
}

const mapStateToProps = (state) => {
  return {
    squad: state.Squad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShipToSquad: (ship) => {
      dispatch(addShipToSquad(ship))
    },
    setModal: () => {
      dispatch(setModal())
    }
  }
}

const ShipCardWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipCard)

export default ShipCardWithState
