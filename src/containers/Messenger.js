import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputBlock from './InputBlock'
import FilteringUser from './FilteringUser'
import FilteredUser from './FilteredUser'
import Message from '../components/Message'
import { changeCurrentConversation } from '../actions/messagesActions'
import { changeMessengerToMessages,
         changeUserListBasedOnFilter,  
         currentUserSearchInputValue,
         createConversation,
         changeGroupCreationToMessenger } from '../actions/groupActions'

class Messenger extends Component {

    componentDidMount() {
        this.props.dispatch(changeCurrentConversation(this.props.currentConversationId))
    }

    componentDidUpdate() {
        if(document.getElementById("messenger")){
            var objDiv = document.getElementById("messenger");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }

    createConversation() {
        this.props.dispatch(changeMessengerToMessages())
    }

    handleCreationOfGroup() {
        var conversationName

        if(document.getElementById("conversation-name").value) {
            conversationName = document.getElementById("conversation-name").value
        }

        this.props.dispatch(createConversation(this.props.allFilteredList, conversationName, this.props.userId))
        this.props.dispatch(changeGroupCreationToMessenger())
    }


    filterList(e) {
        this.props.dispatch(currentUserSearchInputValue(e.target.value))
        var usersAvailable = this.props.usersAvailable
        var filteringList = []

        for(var x in usersAvailable) {
            var playingValue = usersAvailable[x].name
            if(playingValue.toLowerCase().indexOf(e.target.value) != -1) {
                filteringList.push(usersAvailable[x])
            }
        }
        this.props.dispatch(changeUserListBasedOnFilter(filteringList))
    }


    render() {

        //Create array of messages and send them through  Message
        const arrayOfMessages = []

        for (var x in this.props.messages) {
            var messageId = this.props.messages[x].id
            var messageContent = this.props.messages[x].message
            var senderId = this.props.messages[x].senderId
            var timeStamp = this.props.messages[x].timestamp
            if (messageContent == "" || senderId == "") {
                continue
            }

            arrayOfMessages.unshift(
                    <Message 
                        classForBlock={senderId == this.props.userId ? "message-block-self" : "message-block"} 
                        classForMessage={senderId == this.props.userId? "message-content-self" : "message-content"} 
                        messageContent={messageContent} 
                        messageId={messageId} 
                        senderId={senderId} 
                        props={this.props} 
                    />
            )
        }

        //Create array of filtered users for search filter
        const arrayOfFilteringUsers = []
        var filteringList = this.props.filteringList

        for(var x in filteringList) {
            var userName = filteringList[x].name
            var userId = filteringList[x].id

            if(userName) {
                arrayOfFilteringUsers.push(
                    <FilteringUser userName={userName} userId={userId} />
                )
            }
        }

        //Show who was added to the filtered list
        const arrayOfFilteredUsers = []
        var filteredList = this.props.allFilteredList

        for(var x in filteredList) {
            var userId = filteredList[x].id
            var name = filteredList[x].name
            
            if(name) {
                arrayOfFilteredUsers.push(
                    <FilteredUser name={name} userId={userId}/>
                )
            }
        }

        //If group is not being created, show the  InputBlock  to send the messages
        if(!this.props.creatingGroup) {
            return (
                <div className="col-sm-6 main">
                    <div className="messenger" id="messenger">
                        {arrayOfMessages}
                    </div>
                    <InputBlock />
                </div>
            )
        } else {
            return (
                <div className="col-sm-6 main">
                    <form onSubmit={ this.handleCreationOfGroup.bind(this) }>
                        <div className="group-adding-process">
                            <span className="fa fa-search" aria-hidden="true"></span>
                            <input type="text" autocomplete="off" value={this.props.input} onChange={this.filterList.bind(this)} id="search-people-for-group" placeholder="Search friends" onfocus="this.placeholder = ''"/>
                        </div>
                        <div className="wrap-for-friends">
                            <div className="container-for-filtering-list">
                                {arrayOfFilteringUsers}
                            </div>
                            <div className="container-for-filtered-list">
                                {arrayOfFilteredUsers}
                            </div>
                        </div>
                        <div className="conversation-name">
                            <input type="text" autocomplete="off" required id="conversation-name" placeholder="Conversation name" onfocus="this.placeholder = ''"/>
                        </div>
                        <div className="create-group-button">
                            {this.props.button?
                            <input type="submit" id="send-button" value="Create group"/> : null }
                        </div>
                    </form>


                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        creatingGroup: state.groupReducer.creating,
        userId: state.userReducer.userId,
        currentConversationId: state.messagesReducer.currentConversationId,
        messages: state.messagesReducer.messages,
        usersAvailable: state.groupReducer.usersAvailableList,
        filteringList: state.groupReducer.filteringList,
        allFilteredList: state.groupReducer.allFilteredList,
        input: state.groupReducer.input,
        button: state.groupReducer.buttonAppear,
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps)(Messenger)