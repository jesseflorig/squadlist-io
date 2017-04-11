import React from 'react'
import AllShips from '../queries/AllShips'
import Wrapper from '../layout/Wrapper'

const ShipPage = () => {
  return (
    <Wrapper>
      <h1 fontFamily='"Oswald"'>All Ships</h1>
      <AllShips/>
    </Wrapper>
  )
}

export default ShipPage
