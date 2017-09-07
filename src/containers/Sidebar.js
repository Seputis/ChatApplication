import React, { Component } from 'react'
import { connect } from 'react-redux'
import SidebarMessage from '../components/SidebarMessage'
import { changeCurrentConversation,
         changeCurrentConversationsBasedOnFilter } from '../actions/messagesActions'
import { changeMessengerToGroupCreation,
         changeMessengerToMessages,
         emptySidebarInput,
         sidebarValueChanging,
         changeGroupCreationToMessenger,
         refreshFilteringList } from '../actions/groupActions'


class Sidebar extends Component {

  handleOpener(currConvId) {
    this.props.dispatch(changeCurrentConversation(currConvId))
    this.props.dispatch(changeMessengerToMessages())
    this.props.dispatch(emptySidebarInput())
    this.props.dispatch(changeCurrentConversationsBasedOnFilter(this.props.allConversations))
  }


  filterList(e) {
    this.props.dispatch(sidebarValueChanging(e.target.value))
    var updatedList = this.props.allConversations
    var filteredList = []

    for(var x in updatedList) {
      if(updatedList[x].conversation.name == null) {
        var playingValue = "No name"
      } else {
        var playingValue = updatedList[x].conversation.name
      }

      if(playingValue.toLowerCase().indexOf(e.target.value) != -1) {
        filteredList.push(updatedList[x])
      }
    }

    this.props.dispatch(changeCurrentConversationsBasedOnFilter(filteredList))

  }


  createConversation(){
    this.props.dispatch(changeMessengerToGroupCreation())
    this.props.dispatch(refreshFilteringList(this.props.usersAvailableList))
  }

  backToMessenger(){
    this.props.dispatch(changeGroupCreationToMessenger())
  }

  render() {

    const arrayOfConversations = []

    for (var x in this.props.visibleConversations) {
      var currConvId = this.props.visibleConversations[x].conversation.conversationId
      arrayOfConversations.unshift(
        <div onClick={this.handleOpener.bind(this, currConvId, this.props.visibleConversations)} className={currConvId == this.props.currentConversationId ? "sidebar-message-container active" : "sidebar-message-container"}>
           <SidebarMessage information={this.props.visibleConversations[x]}/> 
        </div> 
      )
    }


    return (
      <div className="col-sm-3 sidebar">
        <div className="filter-and-create-new-conversation">

          <div className="search">
            <span className="fa fa-search" aria-hidden="true"></span>
            <input type="text" autocomplete="off" id="search-filter" value={this.props.input} onChange={this.filterList.bind(this)} placeholder="Search" onfocus="this.placeholder = ''"/>
          </div>

          {this.props.creating ?
          <button id="group-conversation" onClick={this.backToMessenger.bind(this)}>-</button> :
          <button id="group-conversation" onClick={this.createConversation.bind(this)}>+</button> }

        </div>
        <div className="conversations">
           {arrayOfConversations}         
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        state: state,
        userId: state.userReducer.userId,
        visibleConversations: state.messagesReducer.visibleConversations,
        allConversations: state.messagesReducer.allConversations,
        currentConversationId : state.messagesReducer.currentConversationId,
        users: state.userReducer.users,
        input: state.groupReducer.inputForSidebar,
        creating: state.groupReducer.creating,
        usersAvailableList: state.groupReducer.usersAvailableList,
    }
}

export default connect(mapStateToProps)(Sidebar)