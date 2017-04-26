import React from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import { closeModal } from '../../../state/actions/uiActions'

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
  backgroundColor: 'rgba(0,0,0,0.8)'
}, (props) => ({
  pointerEvents: props.open ? 'all' : 'none',
  opacity: props.open ? 1 : 0
}))

const ModalInner = glamorous.div({
  position: 'relative',
  padding: '2rem',
  backgroundColor: 'white',
  maxWidth: '90%',
  maxHeight: '90%',
  overflow: 'auto'
})

const ModalToggle = glamorous.div({
  color: 'white',
  fontSize: '2rem'
})

const Modal = ({content, open, closeModal}) => {
  const handleClick = () => {
    closeModal()
  }

  return (
    <StyledModal open={open}>
      <ModalToggle onClick={handleClick}>
        <span>x</span>
      </ModalToggle>
      <ModalInner>
        {content}
      </ModalInner>
    </StyledModal>
  )
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
