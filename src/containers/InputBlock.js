import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addMessage } from '../actions/messagesActions'

class InputBlock extends Component {
    
    handleMessageSubmit(e) {
        e.preventDefault()
        var message = e.target.firstChild.firstChild.value
        this.props.dispatch(addMessage(this.props.userId, message, this.props.currentConversationId))
        document.getElementById("message").value = ''
    }

    render() {
        return (
            <div className="input-block">
                <form className="vertical-middle-magic" onSubmit={ this.handleMessageSubmit.bind(this) } autocomplete="false">
                    <div className="form-div col-sm-12">
                        <input id="message" type="text" required autocomplete="false" />
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userId: state.userReducer.userId,
        currentConversationId : state.messagesReducer.currentConversationId
    }
}

export default connect(mapStateToProps)(InputBlock)
