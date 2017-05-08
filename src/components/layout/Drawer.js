import React, { Component } from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import { closeDrawer } from '../../state/actions/uiActions'
import { TweenMax, Power2 } from 'gsap'
import colors from '../../constants/colors'
import Color from 'color'
import SVGInline from 'react-svg-inline'
import CloseIcon from '../../../public/svg/icons/close.svg'
import PilotList from '../elements/pilots/PilotList'

const StyledDrawer = glamorous.div({
  position: 'fixed',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 100000,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}, (props) => ({
  pointerEvents: props.open ? 'all' : 'none'
}))

const DrawerOverlay = glamorous.div({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  backgroundColor: Color(colors.darkerGrey).darken(0.5).fade(0.2).string()
})

const DrawerInner = glamorous.div({
  position: 'relative',
  padding: '3rem 1rem',
  backgroundColor: colors.darkerGrey,
  width: '80%',
  height: '100%',
  overflow: 'auto'
})

const DrawerToggle = glamorous.div({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  color: 'white',
  width: 30,
  '& path': {
    fill: 'white'
  }
})

class Drawer extends Component{

  componentDidMount() {
    TweenMax.set(this._overlay, {
      alpha: 0
    })
    TweenMax.set(this._drawer, {
      x: window.outerWidth + 100
    })
  }

  componentDidUpdate () {
    const {isOpen} = this.props
    const drawerAnimation = {
      x: isOpen ? 0 : window.outerWidth + 100,
      ease: Power2.easeInOut
    }
    const overlayAnimation = {
      alpha: isOpen ? 1 : 0
    }

    TweenMax.to(this._drawer, 0.75, drawerAnimation)
    TweenMax.to(this._overlay, .75, overlayAnimation)

  }

  render () {
    const {closeDrawer, isOpen, content} = this.props
    const contentMap = {
      'PilotList': <PilotList/>
    }
    return (
      <StyledDrawer innerRef={c => this._container = c} open={isOpen}>
        <DrawerOverlay innerRef={c => this._overlay = c}/>
        <DrawerInner innerRef={c => this._drawer = c}>
          <DrawerToggle onClick={closeDrawer}>
            <SVGInline svg={CloseIcon}/>
          </DrawerToggle>
          {contentMap[content]}
        </DrawerInner>
      </StyledDrawer>
    )
  }
}


const mapStateToProps = (state) => ({
  isOpen: state.ui.drawerOpen,
  content: state.ui.drawerContent
})

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => {
      dispatch(closeDrawer())
    }
  }
}

const DrawerWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer)

export default DrawerWithState
