import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addMessage } from '../actions/messagesActions'
import { PropTypes } from 'prop-types'


class InputBlock extends Component {

    constructor(props) {
        super(props)
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    }
    
    handleMessageSubmit(e) {
        e.preventDefault()
        var message = e.target.firstChild.firstChild.value
        this.props.dispatch(addMessage(message));
    }

    render() {
        return (
            <div className="input-block">
                <form className="vertical-middle-magic" onSubmit={this.handleMessageSubmit }>
                    <div className="form-div col-sm-10">
                        <input id="message" type="text" required />
                    </div>
                    <div className="button-wrap col-sm-2">
                        <input type="submit" id="send-button" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
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

export default connect(mapStateToProps)(InputBlock)
