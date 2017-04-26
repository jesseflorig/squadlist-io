import {
  SET_MODAL,
  CLOSE_MODAL
} from '../actions/uiActions'

const initialState = {
  modal: {
    open: false,
    content: null
  }
}

export default function squad(state = initialState, action) {
  switch (action.type) {
  case SET_MODAL:
    return Object.assign({}, state, {
      modal: {
        open: true,
        content: action.content
      }
    })
  case CLOSE_MODAL:
    return Object.assign({}, state, {
      modal: {
        open: false,
        content: null
      }
    })
  default:
    return state
  }
}
