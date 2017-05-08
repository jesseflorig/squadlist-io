import React from 'react'
import Wrapper from '../layout/Wrapper'
import CreateIcon from '../icons/createIcon'
import Page from '../layout/Page'
import SnackBar from '../layout/SnackBar'
import FactionList from '../elements/factions/FactionList'
import ShipList from '../elements/ships/ShipList'
import { connect } from 'react-redux'
import { setModal } from '../../state/actions/uiActions'
import colors from '../../constants/colors'

const HomePage = ({
  setModal,
  squad }) => {

  const handleNewSquadClick = () => {
    const modalContent = <FactionList/>
    setModal(modalContent)
  }

  return (
    <Page>
      <Wrapper>
        {squad.faction &&
          <ShipList squad={squad}/>
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

const mapStateToProps = (state) => {
  return {
    squad: state.squad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (modalContent) => {
      dispatch(setModal(modalContent))
    }
  }
}

const HomePageWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)

export default HomePageWithState
