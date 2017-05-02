export const SET_MODAL = 'SET_MODAL'
export const SET_DRAWER = 'SET_DRAWER'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'


export function setModal (content) {
  return {
    type: SET_MODAL,
    content: content
  }
}

export function setDrawer (content) {
  return {
    type: SET_DRAWER,
    content: content
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}

export function closeDrawer () {
  return {
    type: CLOSE_DRAWER
  }
}
