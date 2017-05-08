import React from 'react'
import CardList from '../../elements/CardList'
import { gql, graphql } from 'react-apollo'
import { chain } from 'lodash'

const FactionList = ({FactionQuery}) => {
  const {allFactions, loading} = FactionQuery

  // get factions by their parents
  const factions = chain(allFactions)
    .groupBy('parent')
    .map(parentFaction => {
      return {
        name: parentFaction[0].parent,
        factionIds: parentFaction.map(faction =>  faction.id)
      }
    })
    .value()

  return (
    <CardList
      loading={loading}
      cards={factions}
      template="faction"
    />
  )
}

const FactionQuery = gql`
  query allFactions {
    allFactions {
      id
      name
      parent
    }
  }
`

const FactionListWithData = graphql(
  FactionQuery, {name: 'FactionQuery'}
)(FactionList)

export default FactionListWithData
