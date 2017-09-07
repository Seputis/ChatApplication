import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import Messenger from './Messenger'
import RightSidebar from './RightSidebar'
import { initialState } from '../actions/messagesActions'


class App extends Component {

    componentWillMount() {
      if(this.props.userId) {
        this.props.dispatch(initialState(this.props.userId))
      } else {
        this.context.router.push('/');
      }
    }

    render() {

      if(this.props.noShow){
        return(<div className="loader-wrap">
          <div className="loader"></div>
        </div>
        )
      } else {
          return(
          <div className="container-fluid">
            <div className="row">
              <Sidebar/>
              <Messenger/>
              <RightSidebar />
            </div>
          </div>
        )
      }
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userReducer.userId,
        noShow: state.randomReducer.noShow
    }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(App)