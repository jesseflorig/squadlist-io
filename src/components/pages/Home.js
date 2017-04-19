import React from 'react'
import Wrapper from '../layout/Wrapper'
import Button from '../elements/Button'
import CreateIcon from '../icons/createIcon'
import Select from '../elements/forms/select'
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
        <div>
          <Select onChange={handleChangeFaction}>
            {FactionQuery.allFactions.map(faction => {
              return <option value={faction.id}>{faction.name}</option>
            })}
          </Select>

          {ShipQuery.allShips.map(ship => {
            return <p>{ship.name}</p>
          })}
        </div>
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
      name
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
