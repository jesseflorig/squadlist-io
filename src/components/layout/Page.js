import React, {Component} from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import colors from '../../constants/colors.js'

const StyledPage = glamorous.div({
  paddingTop: '4rem',
  minHeight: '100vh',
  backgroundImage: `linear-gradient(${colors.grey}, ${colors.darkerGrey})`
})

class Page extends Component {
  render () {
    return(
      <StyledPage innerRef={c => this._page = c}>
        {this.props.children}
      </StyledPage>
    )
  }
}

const PageWithState = connect(
  (state) => {
    return {
      modal: state.ui.modal
    }
  }
)(Page)

export default PageWithState
