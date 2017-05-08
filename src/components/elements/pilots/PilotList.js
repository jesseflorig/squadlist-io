import React, { Component } from 'react'
import CardList from '../../elements/CardList'
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'

class PilotList extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.PilotQuery.loading !== nextProps.PilotQuery.loading ||
      this.props.activeShip !== nextProps.activeShip
    )
  }

  render () {
    const {allPilots, loading} = this.props.PilotQuery
    return (
      <CardList
      loading={loading}
      cards={allPilots}
      template="pilot"
      />
    )
  }
}

const PilotQuery = gql`
  query allPilots($shipId: ID, $factionId: [ID!]) {
    allPilots(
      filter: {
        ship: {
          id: $shipId
        }
        faction: {
          id_in: $factionId
        }
      }
      orderBy: points_DESC
    ) {
      id
      name
      slots
      points
      skill
      unique
      text
    }
  }
`

const PilotListWithData = graphql(PilotQuery, {
  name: 'PilotQuery',
  options: ({activeShip, faction}) => {
    return {
      variables: {
        shipId: activeShip,
        factionId: faction
      }
    }
  }
})(PilotList)

const mapStateToProps = (state) => ({
  activeShip: state.squad.activeShip,
  faction: state.squad.faction
})

const PilotListWithDataAndState = connect(
  mapStateToProps
)(PilotListWithData)

export default PilotListWithDataAndState
