import React, { Component } from 'react';



const ConversationUser = props => {
    for(var x in props.props.users) {
        if(props.userId == props.props.users[x].id) {
            var userName = props.props.users[x].name
        }
    }
    if(userName) {
        var letter = userName.charAt(0)
    }
        return(
            <div className="rightsidebar-message-block">
                <div className="col-sm-2 sidebar-instead-of-img"><span>{letter}</span></div>
                <div className="col-sm-10 sidebar-message">
                    <div className="sidebar-message-author">{userName}</div>
                </div>
            </div>
        )
}


export default ConversationUser;
