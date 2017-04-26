import React from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import SVGInline from 'react-svg-inline'
import { countBy, map } from 'lodash'

import EliteIcon from '../../../../public/svg/icons/elitepilottalent.svg'
import MissleIcon from '../../../../public/svg/icons/missle.svg'
import BombIcon from '../../../../public/svg/icons/bomb.svg'
import IllicitIcon from '../../../../public/svg/icons/illicit.svg'
import CrewIcon from '../../../../public/svg/icons/crew.svg'
import CannonIcon from '../../../../public/svg/icons/cannon.svg'
import TorpedoIcon from '../../../../public/svg/icons/torpedo.svg'
import TeamIcon from '../../../../public/svg/icons/team.svg'
import CargoIcon from '../../../../public/svg/icons/cargo.svg'
import AstromechIcon from '../../../../public/svg/icons/astromech.svg'
import SalvagedAstromechIcon from '../../../../public/svg/icons/salvagedastromech.svg'
import ModificationIcon from '../../../../public/svg/icons/modification.svg'
import TechIcon from '../../../../public/svg/icons/tech.svg'
import TurretIcon from '../../../../public/svg/icons/turret.svg'
import TitleIcon from '../../../../public/svg/icons/title.svg'

const IconMap = {
  'Elite': EliteIcon,
  'Missile': MissleIcon,
  'Bomb': BombIcon,
  'Illicit': IllicitIcon,
  'Crew': CrewIcon,
  'Cannon': CannonIcon,
  'Torpedo': TorpedoIcon,
  'Astromech': AstromechIcon,
  'Salvaged Astromech': SalvagedAstromechIcon,
  'Team': TeamIcon,
  'Cargo': CargoIcon,
  'Modification': ModificationIcon,
  'Tech': TechIcon,
  'Turret': TurretIcon,
  'Title': TitleIcon
}

const StyledCard = glamorous.div({
  display: 'flex',
  flexFlow: 'column'
})

const CardHeader = glamorous.div({
  alignItems: 'center',
  backgroundColor: 'black',
  display: 'flex',
  padding: '0 .5rem',
  justifyContent: 'space-between'
})

const CardTitle = glamorous.h1({
  color: 'white',
  fontSize: '1.3rem',
  marginRight: '2rem'
})

const CardPoints = glamorous.span({
  display: 'inline-block',
  color: 'white'
})

const CardBody = glamorous.div({
  display: 'flex',
  padding: '1rem'
})

const CardIcon = glamorous.div({
  width: 30,
  display: 'flex',
  marginRight: '.25rem',
  '& span': {
    display: 'block'
  },
  '& svg': {
    width: '100%'
  },
  '& path': {
    fill: 'black'
  }
})

const Slots = glamorous.div({
  display: 'flex'
})

const Slot = glamorous.div({
  display: 'block'
})


const PilotCard = ({card}) => {
  const {name, slots} = card
  const groupSlots = countBy(slots, slot => slot)
  const handleClick = () => {

  }

  return (
    <StyledCard onClick={handleClick}>
      <CardHeader>
        <CardTitle dangerouslySetInnerHTML={{__html: `${card.name}`}}/>
        <CardPoints>{card.points}</CardPoints>
      </CardHeader>
      <CardBody>
        <Slots>
          {map(groupSlots, (count, slotName) => {
            const icon = IconMap[slotName]
            return (
              <Slot key={`${name}-${slotName}`}>
                <CardIcon>
                  <SVGInline svg={icon} />
                </CardIcon>
              </Slot>
            )
          })}
        </Slots>
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

  }
}

const PilotCardWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(PilotCard)

export default PilotCardWithState
