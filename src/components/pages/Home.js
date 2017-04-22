import React from 'react'
import Wrapper from '../layout/Wrapper'
import Button from '../elements/Button'
import CreateIcon from '../icons/createIcon'
import Select from '../elements/forms/select'
import Grid from '../layout/Grid'
import GridItem from '../layout/GridItem'
import CardList from '../elements/CardList'
import { connect } from 'react-redux'
import { activateBuilder, setFaction } from '../../state/actions/squadActions'
import { gql, graphql, compose } from 'react-apollo'

const HomePage = ({
  handleActivateClick,
  handleSetFaction,
  FactionQuery,
  ShipQuery,
  squad
}) => {

  const handleChangeFaction = (e) => {
    const faction = e.target.value
    handleSetFaction(faction)
  }

  return (
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
          </GridItem>
        </Grid>
      }
    </Wrapper>
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
    allShips(filter: {
      faction: {
        id: $factionId
      }
    }) {
      id
      name
      attack
      agility
      hull
      shields
    }
  }
`

const mapStateToProps = (state) => {
  return {
    squad: state.squad
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
