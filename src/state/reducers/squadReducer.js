import { SET_FACTION, ACTIVATE_BUILDER } from '../actions/squadActions'

const initialState = {
  isActive: false,
  faction: ''
}

export default function squad(state = initialState, action) {
  switch (action.type) {
  case ACTIVATE_BUILDER:
    return Object.assign({}, state, {
      isActive: true
    })
  case SET_FACTION:
    return Object.assign({}, state, {
      faction: action.faction
    })
  default:
    return state
  }
}
