import React, {Component, PropTypes} from 'react'
import { gql, graphql } from 'react-apollo'

class List extends Component {
  render() {
    const {data} = this.props

    if (!data.loading) {
      return (
        <div className="application">
          <h1>List</h1>

          {data.allShips.map(ship => {
            return <p>{ship.name}</p>
          })}
        </div>
      )
    }

    return <div>Loading...</div>
  }
}

List.propTypes = {
  children: PropTypes.object
}

const listQuery = gql`
  query allShips {
    allShips {
      id
      name
    }
  }
`

const ListWithData = graphql(listQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(List)

export default ListWithData
