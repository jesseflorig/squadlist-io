import React, { Component } from 'react'
import glamorous from 'glamorous'
import colors from '../../constants/colors'
import ShipCard from './ships/ShipCard'
import PilotCard from './pilots/PilotCard'
import FactionCard from './factions/FactionCard'
import { TweenMax, Power4 } from 'gsap'

const StyledCardList = glamorous.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const StyledCard = glamorous.li({
  fontFamily: '"Roboto", sans-serif',
  '&:not(:last-of-type)': {
    marginBottom: '1rem'
  }
})

const TemplateMap = (template, item) => {
  const templates = {
    ship: <ShipCard card={item}/>,
    pilot: <PilotCard card={item}/>,
    faction: <FactionCard card={item}/>
  }

  return templates[template]
}

const AnimateIn = {
  y: 0,
  alpha: 1,
  scale: 1,
  ease: Power4.easeOut
}

const AnimateReset = {
  y: 10,
  alpha: 0,
  scale: 1.1
}

const StaggerDelay = 0.1
const Duration = 2

class CardList extends Component {

  shouldComponentUpdate (nextProps) {
    return this.props.cards !== nextProps.cards
  }

  componentDidUpdate () {
    // TweenMax.killAll()
    this.animateCardList(`.${this.props.template}-card`)
  }

  componentDidMount () {
    this.animateCardList(`.${this.props.template}-card`)
  }

  animateCardList (selector) {
    TweenMax.staggerFromTo(selector, Duration, AnimateReset, AnimateIn, StaggerDelay)
  }

  render () {
    const {cards, template} = this.props
    return (
      <StyledCardList>
        {cards && cards.map(item => {
          return (
            <StyledCard ref={c => this._card = c} className={`${template}-card`} key={item.id}>
              {TemplateMap(template, item)}
            </StyledCard>
          )
        })}
      </StyledCardList>
    )
  }
}

export default CardList
