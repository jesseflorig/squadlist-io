export const SET_MODAL = 'SET_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'


export function setModal (content) {
  return {
    type: SET_MODAL,
    content: content
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}
