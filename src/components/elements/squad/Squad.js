import React from 'react'
import { connect } from 'react-redux'

const Squad = ({squad}) => {
  const {ships} = squad
  return (
    <div>
      {ships.map((ship, index) => {
        return (
          <div key={index}>{ship.name}</div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    squad: state.squad
  }
}

const SquadWithState = connect(
  mapStateToProps
)(Squad)

export default SquadWithState
