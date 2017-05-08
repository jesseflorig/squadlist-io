import React, { Component } from 'react'
import CardList from '../../elements/CardList'
import { gql, graphql } from 'react-apollo'

class ShipList extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.ShipQuery.loading !== nextProps.ShipQuery.loading ||
      this.props.squad.faction !== nextProps.squad.faction
    )
  }

  render () {
    const {allShips, loading} = this.props.ShipQuery
    return (
      <CardList
        loading={loading}
        cards={allShips}
        template="ship"
        />
    )

  }
}

const ShipQuery = gql`
  query allShips($factionIds: [ID!]) {
    allShips(
      filter: {
        pilots_some: {
          faction: {
            id_in: $factionIds
          }
        }
      }
      orderBy: name_ASC
    ) {
      id
      name
      attack
      agility
      hull
      shields
      actions
    }
  }
`

const ShipListWithData = graphql(ShipQuery, {
  name: 'ShipQuery',
  options: ({squad}) => {
    return {
      variables: {
        factionIds: squad.faction
      }
    }
  }
})(ShipList)

export default ShipListWithData
