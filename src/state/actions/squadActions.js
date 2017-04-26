export const ACTIVATE_BUILDER = 'ACTIVATE_BUILDER'
export const SET_FACTION = 'SET_FACTION'
export const ADD_SHIP_TO_SQUAD = 'ADD_SHIP_TO_SQUAD'
export const SET_ACTIVE_SHIP = 'SET_ACTIVE_SHIP'

export function activateBuilder () {
  return {
    type: ACTIVATE_BUILDER
  }
}

export function setFaction (faction) {
  return {
    type: SET_FACTION, faction
  }
}

export function addShipToSquad (ship) {
  return {
    type: ADD_SHIP_TO_SQUAD, ship
  }
}

export function setActiveShip (ship) {
  return {
    type: SET_ACTIVE_SHIP, ship
  }
}
