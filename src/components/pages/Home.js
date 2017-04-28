import React from 'react'
import Wrapper from '../layout/Wrapper'
import CreateIcon from '../icons/createIcon'
import Page from '../layout/Page'
import SnackBar from '../layout/SnackBar'
import CardList from '../elements/CardList'
import { connect } from 'react-redux'
import { setModal } from '../../state/actions/uiActions'
import { gql, graphql, compose } from 'react-apollo'
import { chain } from 'lodash'
import colors from '../../constants/colors'

const HomePage = ({
  setModal,
  FactionQuery,
  ShipQuery,
  PilotQuery,
  squad }) => {

  const handleNewSquadClick = () => {

    // get factions by their parents
    const factions = chain(FactionQuery.allFactions)
      .groupBy('parent')
      .map(parentFaction => {
        return {
          name: parentFaction[0].parent,
          factionIds: parentFaction.map(faction =>  faction.id)
        }
      })
      .value()

    const modalContent =
      <CardList
        loading={FactionQuery.loading}
        cards={factions}
        template="faction"
      />

    setModal(modalContent)
  }

  return (
    <Page>
      <Wrapper>
        {squad.faction &&
          <CardList
            loading={ShipQuery.loading}
            cards={ShipQuery.allShips}
            template="ship"
          />
        }
      </Wrapper>
      <SnackBar items={[
        {
          text: 'New Squad',
          icon: <CreateIcon color={colors.accent}/>,
          onClick: handleNewSquadClick
        }
      ]}/>
    </Page>
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
    }
  }
`

const PilotQuery = gql`
  query allPilots($shipId: ID) {
    allPilots(
      filter: {
        ship: {
          id: $shipId
        }
      }
      orderBy: points_DESC
    ) {
      id
      name
      slots
      points
      skill,
      unique
    }
  }
`

const mapStateToProps = (state) => {
  return {
    squad: state.squad,
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (modalContent) => {
      dispatch(setModal(modalContent))
    }
  }
}

const HomePageWithData = compose(
  graphql(FactionQuery, {name: 'FactionQuery'}),
  graphql(PilotQuery, {
    name: 'PilotQuery',
    options: ({squad}) => {
      return {
        variables: {
          shipId: squad.activeShip
        }
      }
    }
  }),
  graphql(ShipQuery, {
    name: 'ShipQuery',
    options: ({squad}) => {
      return {
        variables: {
          factionIds: squad.faction
        }
      }
    }
  })
)(HomePage)

const HomePageWithDataAndState = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageWithData)

export default HomePageWithDataAndState
