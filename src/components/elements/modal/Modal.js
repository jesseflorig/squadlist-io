import React, { Component } from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import { closeModal } from '../../../state/actions/uiActions'
import { TweenMax, Power4 } from 'gsap'
import SVGInline from 'react-svg-inline'
import colors from '../../../constants/colors'
import CloseIcon from '../../../../public/svg/icons/close.svg'

const StyledModal = glamorous.div({
  position: 'fixed',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 100000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: `linear-gradient(${colors.primary}, ${colors.secondary})`
}, (props) => ({
  pointerEvents: props.open ? 'all' : 'none',
  opacity: props.open ? 1 : 0
}))

const ModalInner = glamorous.div({
  position: 'relative',
  padding: '2rem',
  backgroundColor: 'white',
  width: '90%',
  height: '90%',
  overflow: 'auto',
  marginTop: '2rem'
})

const ModalToggle = glamorous.div({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  color: 'white',
  width: 30,
  '& path': {
    fill: 'white'
  }
})

class Modal extends Component{

  componentDidMount() {
    TweenMax.set(this._modal, {
      alpha: 0,
      scale: 1.1
    })
  }

  componentDidUpdate () {
    let animation = {
      alpha: this.props.open ? 1 : 0,
      scale: this.props.open ? 1 : 1.1,
      ease: Power4.easeOut
    }
    TweenMax.to(this._modal, 1, animation)
  }

  render () {
    const {content, open, closeModal} = this.props
    return (
      <StyledModal innerRef={c => this._modal = c} open={open}>
        <ModalToggle onClick={closeModal}>
          <SVGInline svg={CloseIcon}/>
        </ModalToggle>
        <ModalInner>
          {content}
        </ModalInner>
      </StyledModal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

const ModalWithState = connect(
  null,
  mapDispatchToProps
)(Modal)

export default ModalWithState
