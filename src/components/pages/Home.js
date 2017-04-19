import React from 'react'
import Wrapper from '../layout/Wrapper'
import Button from '../elements/Button'
import CreateIcon from '../icons/createIcon'

const HomePage = () => {

  const handleClick = (e) => {
    console.log(e)
  }

  return (
    <Wrapper>
      <Button
        text="New Squad"
        type="primary"
        onClick={handleClick}
        icon={<CreateIcon color="white"/>}/>
    </Wrapper>
  )
}

export default HomePage
