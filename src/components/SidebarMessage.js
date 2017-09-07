import React, { Component } from 'react';

const SidebarMessage = props => {
    var groupName = props.information.conversation.name
    const lastSeen = props.information.conversation.lastseen

    if(!groupName) {
        groupName = 'No Name'
    }
    
    const letter = groupName.charAt(0)
        return(
            <div className="sidebar-message-block">
                <div className="col-sm-2 sidebar-instead-of-img"><span>{letter}</span></div>
                <div className="col-sm-10 sidebar-message">
                    <div className="sidebar-message-author">{groupName}</div>
                    <div className="sidebar-message-content"><span>Last message: {lastSeen ? lastSeen : 'No one knows'}</span></div>
                </div>
            </div>
        )
}

export default SidebarMessage;
