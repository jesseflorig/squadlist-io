import React, { Component } from 'react'
import glamorous from 'glamorous'
import ShipCard from './ships/ShipCard'
import PilotCard from './pilots/PilotCard'
import FactionCard from './factions/FactionCard'
import { TweenMax, Power2 } from 'gsap'
import colors from '../../constants/colors'

const StyledCardList = glamorous.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const StyledCard = glamorous.li({
  fontFamily: '"Roboto", sans-serif',
  borderBottom: `1px solid ${colors.mediumGrey}`
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
  alpha: 1,
  scale: 1,
  delay: 0.25,
  ease: Power2.easeInOut
}

const AnimateReset = {
  alpha: 0,
  scale: 1.1
}

const StaggerDelay = 0.1
const Duration = 1

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
