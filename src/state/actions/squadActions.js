export const ACTIVATE_BUILDER = 'ACTIVATE_BUILDER'
export const SET_FACTION = 'SET_FACTION'

export function activateBuilder() {
  return {
    type: ACTIVATE_BUILDER
  }
}

export function setFaction(faction) {
  return {
    type: SET_FACTION, faction
  }
}
