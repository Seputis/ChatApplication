import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendUserId } from '../actions/userActions'

class AppLogin extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        var input = e.target.childNodes[1].value;
        var parsedInput = parseInt(input);

        if(parsedInput == input && parsedInput <= 5) {
            try {
                this.props.dispatch(sendUserId(parsedInput))
            }
            finally {
                this.context.router.push('/logged')
            }
        } else {
            this.handleError()
        }
    }

    handleError() {
        alert('Please provide any number from 1 to 5')
    }

    render(){
        return(
            <div className="start-wrap">
                <form className="username-wrap" onSubmit={ this.handleLogin }>
                    <div className="text">
                        <h1>Chat for bunq</h1>
                        <h6>Select your hypothetical ID from 1 to 5</h6>
                    </div>
                    <input type="text" required placeholder="Enter your ID" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

AppLogin.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect()(AppLogin)