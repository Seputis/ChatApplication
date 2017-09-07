import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendUserId, loginError } from '../actions/userActions'

class AppLogin extends Component {

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
        this.props.dispatch(loginError())
    }

    render(){

        var errorDiv = <div className="error-box">
                            <p>Please provide correct ID.</p>
                      </div>

        return(
            <div className="start-wrap">
                <form className="username-wrap" onSubmit={ this.handleLogin.bind(this) }>
                    <div className="text" id="text">
                        <h1>Chat for bunq</h1>
                        <h6>Select your ID from 1 to 5</h6>
                    </div>
                    <input type="text" autocomplete="off" className={this.props.loginError ? "error-input" : null} required placeholder="Enter your ID" />
                    {this.props.loginError ? errorDiv : null}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

AppLogin.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        loginError: state.userReducer.loginError,
    }
}

export default connect(mapStateToProps)(AppLogin)