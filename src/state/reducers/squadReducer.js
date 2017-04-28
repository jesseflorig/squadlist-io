import {
  SET_FACTION,
  ACTIVATE_BUILDER,
  ADD_SHIP_TO_SQUAD } from '../actions/squadActions'

const initialState = {
  isActive: false,
  ships: [],
  activeShip: null,
  faction: null
}

export default function squad(state = initialState, action) {
  const ships = state.ships
  switch (action.type) {
  case ACTIVATE_BUILDER:
    return Object.assign({}, state, {
      isActive: true
    })
  case SET_FACTION:
    return Object.assign({}, state, {
      faction: action.faction
    })
  case ADD_SHIP_TO_SQUAD:
    ships.push(action.ship)
    return Object.assign({}, state, {
      ships: ships,
      activeShip: action.ship.id
    })
  default:
    return state
  }
}
