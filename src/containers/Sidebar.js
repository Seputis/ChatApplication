import React, { Component } from 'react'
import { connect } from 'react-redux'
import SidebarMessage from '../components/SidebarMessage'
import { getUserData } from '../actions/userActions'
import { getSidebarConversations, changeCurrentConversation } from '../actions/messagesActions'

class Sidebar extends Component {

  componentDidMount() {
  }  

  handleOpener(currConvId) {
    this.props.dispatch(changeCurrentConversation(currConvId))
  }

  render() {
    const arrayOfConversations = []

    for (var x in this.props.conversations) {
      var currConvId = this.props.conversations[x].conversation.conversationId
      arrayOfConversations.push(
        <div onClick={this.handleOpener.bind(this, currConvId)} className={currConvId == this.props.currentConversationId ? "sidebar-message-container active" : "sidebar-message-container"}>
          <SidebarMessage information={this.props.conversations[x]}/>
        </div> 
      )
    }

    return (
      <div className="col-sm-3 sidebar">
          {arrayOfConversations}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        state: state,
        userId: state.userReducer.userId,
        conversations: state.messagesReducer.conversations,
        currentConversationId : state.messagesReducer.currentConversationId
    }
}

export default connect(mapStateToProps)(Sidebar)