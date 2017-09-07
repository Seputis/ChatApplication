import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Message = props => {
    var messageContent = props.messageContent
    var classForBlock = props.classForBlock
    var classForMessage = props.classForMessage

    for(var x in props.props.users) {
        if(props.senderId == props.props.users[x].id) {
            var userName = props.props.users[x].name
        }
    }
    
    if(userName) {
        var letter = userName.charAt(0)
    }

    if(classForBlock == "message-block-self") {
        return(
            <div className={classForBlock} id={classForBlock}>
                <div className="message">
                    <div className={classForMessage}><p>{messageContent}</p></div>
                </div>
            </div>
        )
    } else {
        return(
            <div className={classForBlock} id={classForBlock}>
                <div className="instead-of-img"><span>{letter}</span></div>
                <div className="message">
                    <div className="message-author">
                        <div className="message-author">{userName}</div>
                    </div>
                    <div className={classForMessage}><p>{messageContent}</p></div>
                </div>
            </div>
        )
    }
}

export default Message
