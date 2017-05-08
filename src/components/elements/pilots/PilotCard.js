import React from 'react'
import glamorous from 'glamorous'
import { chain, map } from 'lodash'
import colors from '../../../constants/colors'

const StyledCard = glamorous.div({
  display: 'flex',
  flexFlow: 'column'
})

const CardHeader = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  padding: '1rem .5rem',
  justifyContent: 'space-between'
})

const CardTitle = glamorous.h1({
  color: colors.offWhite,
  fontSize: '1.2rem',
  fontWeight: 900,
  margin: 0
})

const PilotSkill = glamorous.span({
  color: 'orange',
  fontFamily: 'kimberleyblack',
  border: '1px solid orange',
  padding: '.5rem',
  borderRadius: '3px',
  marginRight: '.5rem'
})

const PilotPoints = glamorous.span({
  fontFamily: 'kimberleyblack',
  border: `1px solid ${colors.offWhite}`,
  padding: '.5rem',
  display: 'inline-block',
  color: colors.offWhite,
  borderRadius: '3px'
})

const PilotTalent = glamorous.p({
  color: colors.offWhite,
  margin: 0,
  fontWeight: 100,
  lineHeight: 1.5
})


const CardBody = glamorous.div({
  display: 'flex',
  flexFlow: 'column',
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
  display: 'flex',
  padding: '2rem 0'
})

const Slot = glamorous.div({
  display: 'block',
  '& svg': {
    fill: colors.offWhite
  }
})


const PilotCard = ({card}) => {
  const {name, slots, skill, text, points} = card
  const groupSlots = chain(slots)
    .orderBy(slot => slot)
    .value()

  const handleClick = () => {

  }

  return (
    <StyledCard onClick={handleClick}>
      <CardHeader>
        <PilotSkill>{skill}</PilotSkill>
        <CardTitle dangerouslySetInnerHTML={{__html: `${name}`}}/>
        <PilotPoints>{points}</PilotPoints>
      </CardHeader>
      <CardBody>
        <PilotTalent>
          {text}
        </PilotTalent>
        <Slots>
          {map(groupSlots, (slotName, index) => {
            return (
              <Slot key={`${index}-${slotName}`}>
                <CardIcon>
                  <svg height='24' width='24'>
                    <title>{slotName}</title>
                    <use href={`#${slotName}`}></use>
                  </svg>
                </CardIcon>
              </Slot>
            )
          })}
        </Slots>
      </CardBody>
    </StyledCard>
  )
}

export default PilotCard
