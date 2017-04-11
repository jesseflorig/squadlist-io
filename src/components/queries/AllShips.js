import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import List from '../elements/List'

class AllShips extends React.Component {
  render() {
    const {data} = this.props

    if (!data.loading) {
      return (
        <List items={data.allShips} link="/ships"/>
      )
    }

    return <div>Loading...</div>
  }
}

AllShips.propTypes = {
  data: PropTypes.object
}

const AllShipsQuery = gql`
  query allShips {
    allShips {
      id
      name
    }
  }
`

const AllShipsWithData = graphql(AllShipsQuery)(AllShips)

export default AllShipsWithData
