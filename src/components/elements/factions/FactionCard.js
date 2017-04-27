import React from 'react'
import { connect } from 'react-redux'
import { setFaction } from '../../../state/actions/squadActions'
import { closeModal } from '../../../state/actions/uiActions'
import glamorous from 'glamorous'
import SVGInline from 'react-svg-inline'
import ScumIcon from '../../../../public/svg/icons/scum.svg'
import ImperialIcon from '../../../../public/svg/icons/imperial.svg'
import RebelIcon from '../../../../public/svg/icons/rebellion.svg'
import colors from '../../../constants/colors'

const StyledCard = glamorous.li({
  display: 'flex',
  flex: 1,
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${colors.secondary}`,
  '&:not(:first-of-type)': {
    marginTop: '1rem'
  }
})

const CardIcon = glamorous.div({
  width: 75,
  display: 'flex',
  '& svg': {
    width: '100%'
  },
  '& path': {
    fill: 'white'
  }
})

const CardTitle = glamorous.h1({
  color: 'white',
  lineHeight: '1',
  margin: 0
})

const CardBody = glamorous.div({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  padding: '1rem'
})

const IconMap = {
  'SCUM': ScumIcon,
  'EMPIRE': ImperialIcon,
  'REBEL': RebelIcon
}

const FactionCard = ({card, setFaction, closeModal}) => {
  console.log(card)
  const {name, factionIds} = card
  const handleClick = () => {
    setFaction(factionIds)
    closeModal()
  }
  const factionIcon = IconMap[name]

  return (
    <StyledCard onClick={handleClick}>
      <svg width="0" height="0" style={{opacity: '0'}}>
        <defs>
          <linearGradient id="MyGradient">
            <stop offset="5%" stopColor={colors.primary} />
            <stop offset="95%" stopColor={colors.secondary} />
          </linearGradient>
        </defs>
      </svg>
      <CardBody>
        <CardIcon>
          <SVGInline svg={factionIcon}/>
        </CardIcon>
        <CardTitle>{name}</CardTitle>
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
    setFaction: (faction) => {
      dispatch(setFaction(faction))
    },
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

const FactionCardWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(FactionCard)

export default FactionCardWithState
