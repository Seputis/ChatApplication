import React, { Component } from 'react'
import {connect} from 'react-redux'
import ConversationUser from '../components/ConversationUser'

class RightSidebar extends Component {

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
                            var lastseen;

                            for(let t in this.props.usersForLastSeen) {

                                if(this.props.usersForLastSeen[t].id == userId) {
                                    let user = this.props.usersForLastSeen[t]
                                    lastseen = currentConversation[y][c].lastseen
                                    
                                    if(!lastseen){
                                        lastseen = "No one knows"
                                    }
                                }
                            }
                            arrayOfUsers.push(
                                <div className="rightsidebar-message-container">
                                    <ConversationUser lastseen={lastseen} userId={userId} props={this.props}/>
                                </div>
                            )
                        }
                    }
                }
            }
        }

        return (
            <div className="col-sm-3 right-sidebar">
                <h5>Members of this chat</h5>
                <div className="conversation-users">
                    {arrayOfUsers}
                </div>
                <div className="information-about-me">
                    <h3>Aironas Seputis chat application</h3>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        userId: state.userReducer.userId,
        conversations: state.messagesReducer.allConversations,
        currentConversationId : state.messagesReducer.currentConversationId,
        usersForLastSeen: state.messagesReducer.usersArray
    }
}

export default connect(mapStateToProps)(RightSidebar)
