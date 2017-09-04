import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Message = props => {

    var messageContent = props.messageContent

    for(var x in props.props.users) {
        if(props.senderId == props.props.users[x].id) {
            var userName = props.props.users[x].name
        }
    }
    if(userName) {
        var letter = userName.charAt(0)
    }

    return(
        <div className="message-block">
            <div className="instead-of-img"><span>{letter}</span></div>
            <div className="message">
                <div className="message-author-and-time">
                    <div className="message-author">{userName}</div>
                    <div className="message-time">06:32:21</div>
                </div>
                <div className="message-content"><p>{messageContent}</p></div>
            </div>
        </div>
    )
}

export default Message
