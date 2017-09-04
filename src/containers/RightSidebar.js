import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ConversationUser from '../components/ConversationUser'
import ExtraDetails from '../components/ExtraDetails'
import { getUserData } from '../actions/userActions'
import { getSidebarConversations, getCurrentConversationUsers } from '../actions/messagesActions'


class RightSidebar extends Component {

    componentDidUpdate() {
    }  

    render() {

        const arrayOfUsers = []

        for (var x in this.props.conversations) {
            var currConvId = this.props.conversations[x].conversation.conversationId
            if(currConvId == this.props.currentConversationId) {
                var currentConversation = this.props.conversations[x]
                for(var y in currentConversation) {
                    if(Array.isArray(currentConversation[y])) {
                        for(var c in currentConversation[y]) {
                            var userId = currentConversation[y][c].userid
                            userId = parseInt(userId.replace(/[^0-9\.]/g, ''), 10);
                            arrayOfUsers.push(
                                <div className="rightsidebar-message-container">
                                    <ConversationUser userId={userId} props={this.props}/>
                                </div>
                            )
                        }
                    }
                }
            }
        }

        return (
            <div className="col-sm-3 right-sidebar">
                <div className="conversation-users">
                    {arrayOfUsers}
                </div>
                <ExtraDetails />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        userId: state.userReducer.userId,
        conversations: state.messagesReducer.conversations,
        currentConversationId : state.messagesReducer.currentConversationId
    }
}

export default connect(mapStateToProps)(RightSidebar)
