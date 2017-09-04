import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InputBlock from './InputBlock'
import Message from '../components/Message'
import { changeCurrentConversation } from '../actions/messagesActions'


class Messenger extends Component {

    componentDidMount() {
        this.props.dispatch(changeCurrentConversation(this.props.currentConversationId))
    }

    render() {

        const arrayOfMessages = []

        for (var x in this.props.messages) {
            var messageId = this.props.messages[x].id
            var messageContent = this.props.messages[x].message
            var senderId = this.props.messages[x].senderId
            var timeStamp = this.props.messages[x].timestamp
            arrayOfMessages.push(
                    <Message messageContent={messageContent} messageId={messageId} senderId={senderId} props={this.props} />
            )

        }

        return (
            <div className="col-sm-6 main">
                <div className="messenger">
                    {arrayOfMessages}
                </div>
                <InputBlock />
            </div>
        );
    }










}

const mapStateToProps = state => {
    return {
        currentConversationId: state.messagesReducer.currentConversationId,
        messages: state.messagesReducer.messages,
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps)(Messenger)