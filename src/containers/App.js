import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import Messenger from './Messenger'
import RightSidebar from './RightSidebar'
import { getSidebarConversations } from '../actions/messagesActions'
import { getUserData, getUsers } from '../actions/userActions'


class App extends Component {

    componentWillMount() {
      if(this.props.userId) {
        this.props.dispatch(getUserData(this.props.userId))
        this.props.dispatch(getUsers())
      } else {
        this.context.router.push('/');
      }
    }

    // componentDidMount() {
    //   this.props.dispatch(getSidebarConversations(this.props.userId))
    // }

    componentDidUpdate() {
      this.props.dispatch(getSidebarConversations(this.props.userId))
    }

    render() {
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

const mapStateToProps = state => {
    return {
        userId: state.userReducer.userId,
    }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps)(App)