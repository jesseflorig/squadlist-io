import {
  SET_MODAL,
  SET_DRAWER,
  CLOSE_MODAL,
  CLOSE_DRAWER
} from '../actions/uiActions'

const initialState = {
  modalOpen: false,
  modalContent: null,
  drawerOpen: false,
  drawerContent: null
}

export default function squad(state = initialState, action) {
  switch (action.type) {
  case SET_MODAL:
    return {...state,
      modalOpen: true,
      modalContent: action.content
    }
  case CLOSE_MODAL:
    return {
      ...state,
      modalOpen: false
    }
  case SET_DRAWER:
    return {
      ...state,
      drawerOpen: true,
      drawerContent: action.content
    }
  case CLOSE_DRAWER:
    return {
      ...state,
      drawerOpen: false
    }
  default:
    return state
  }
}
