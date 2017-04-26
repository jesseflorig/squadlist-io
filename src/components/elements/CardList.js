import React, { Component } from 'react'
import glamorous from 'glamorous'
import colors from '../../constants/colors'
import ShipCard from './ships/ShipCard'
import PilotCard from './pilots/PilotCard'
import { TweenMax, Power4 } from 'gsap'

const StyledCardList = glamorous.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const StyledCard = glamorous.li({
  backgroundColor: colors.grey,
  fontFamily: '"Roboto", sans-serif',
  '&:not(:last-of-type)': {
    marginBottom: '1rem'
  }
})

const TemplateMap = (template, item) => {
  const templates = {
    ship: <ShipCard card={item}/>,
    pilot: <PilotCard card={item}/>
  }

  return templates[template]
}

const AnimateIn = {
  y: 0,
  alpha: 1,
  ease: Power4.easeOut
}

const AnimateReset = {
  y: 10,
  alpha: 0
}

const StaggerDelay = 0.05
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
    const {cards, template, loading} = this.props
    console.log(loading)
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
