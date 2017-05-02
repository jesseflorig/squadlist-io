import React, { Component } from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import { closeModal } from '../../../state/actions/uiActions'
import { TweenMax, Power2 } from 'gsap'
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
  backgroundImage: `linear-gradient(${colors.grey}, ${colors.darkerGrey})`
}, (props) => ({
  pointerEvents: props.open ? 'all' : 'none',
  opacity: props.open ? 1 : 0
}))

const ModalInner = glamorous.div({
  position: 'relative',
  padding: '2rem',
  backgroundColor: colors.darkerGrey,
  border: '1px solid white',
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
    this.resetModal(this._modal)
  }

  componentDidUpdate () {
    const {isOpen} = this.props
    let animation = {
      alpha: isOpen ? 1 : 0,
      scale: isOpen ? 1 : 0.9,
      ease: Power2.easeInOut,
      onComplete: isOpen ? null : this.resetModal
    }

    TweenMax.to(this._modal, 0.75, animation)
  }

  resetModal (modal) {
    // reset modal on mount or when modal is closed via TweenMax onComplete callback
    TweenMax.set(modal || this.target, {
      alpha: 0,
      scale: 1.1
    })
  }

  render () {
    const {content, isOpen, closeModal} = this.props
    return (
      <StyledModal innerRef={c => this._modal = c} open={isOpen}>
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

const mapStateToProps = (state) => ({
  isOpen: state.ui.modalOpen,
  content: state.ui.modalContent
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal())
  }
})

const ModalWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)

export default ModalWithState
