import React from 'react'
import AllShips from '../queries/AllShips'
import Wrapper from '../layout/Wrapper'
import { gql, graphql } from 'react-apollo'

class ShipPage extends React.Component{
  render () {
    const {data} = this.props
    if (!data.loading) {
      const {Ship} = data
      const {name, agility, shields, attack, hull, maneuvers, pilots, slots} = Ship
      return (
        <Wrapper>
          <h1 fontFamily='"Oswald"'>{name}</h1>
          <ul>
            <li>{`Attack: ${attack}`}</li>
            <li>{`Agility: ${agility}`}</li>
            <li>{`Shields: ${shields}`}</li>
            <li>{`Hull: ${hull}`}</li>
            <li>Pilots:
              <ul>
                {pilots.map(pilot => {
                  return <li>{pilot.name}</li>
                })}
              </ul>
            </li>
          </ul>
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        <div>Loading...</div>
      </Wrapper>
    )

  }
}

const ShipQuery = gql`
  query Ship($id: ID!){
    Ship(id: $id){
      name
      agility
      shields
      attack
      hull
      maneuvers
      pilots {
        name
      }
      slots {
        name
      }
    }
  }
`

const ShipPageWithData = graphql(ShipQuery, {
  options: ({match}) => ({
    variables: {
      id: match.params.shipId
    }
  })
})(ShipPage)

export default ShipPageWithData
