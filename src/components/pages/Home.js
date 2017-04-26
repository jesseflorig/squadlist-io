import React from 'react'
import Wrapper from '../layout/Wrapper'
import Button from '../elements/Button'
import CreateIcon from '../icons/createIcon'
import Select from '../elements/forms/select'
import Grid from '../layout/Grid'
import GridItem from '../layout/GridItem'
import CardList from '../elements/CardList'
import Squad from '../elements/squad/Squad'
import Modal from '../elements/modal/Modal'
import { connect } from 'react-redux'
import { activateBuilder, setFaction } from '../../state/actions/squadActions'
import { gql, graphql, compose } from 'react-apollo'

const HomePage = ({
  handleActivateClick,
  handleSetFaction,
  FactionQuery,
  ShipQuery,
  PilotQuery,
  squad,
  modal }) => {

  const handleChangeFaction = (e) => {
    const faction = e.target.value
    handleSetFaction(faction)
  }

  return (
    <div>
      <Wrapper>
        <Button
          text="New Squad"
          type="primary"
          onClick={handleActivateClick}
          icon={<CreateIcon color="white"/>}/>


        {squad.isActive &&
          <Grid gutters="2%">
            {FactionQuery.allFactions &&
            <GridItem width="40%">
              <Select onChange={handleChangeFaction}>
                {FactionQuery.allFactions.map(faction => {
                  return <option value={faction.id} key={faction.id}>{faction.name}</option>
                })}
              </Select>

              <CardList
                cards={ShipQuery.allShips}
                template="ship"
              />

            </GridItem>
            }
            <GridItem width="60%">
              <h1>Current Squad</h1>
              <Squad/>
            </GridItem>
          </Grid>
        }
      </Wrapper>

      <Modal
        content={
          <CardList
            loading={PilotQuery.loading}
            cards={PilotQuery.allPilots}
            template="pilot"
          />
        }
        open={modal.open}
      />
    </div>
  )
}

const FactionQuery = gql`
  query allFactions {
    allFactions {
      id
      name
    }
  }
`

const ShipQuery = gql`
  query allShips($factionId: ID) {
    allShips(
      filter: {
        faction: {
          id: $factionId
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
    handleActivateClick: () => {
      dispatch(activateBuilder())
    },
    handleSetFaction: (faction) => {
      dispatch(setFaction(faction))
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
          factionId: squad.faction
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
