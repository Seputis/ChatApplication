import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUserToFilteredList,
         removeUserFromFilteringList,
         emptySearchInput } from '../actions/groupActions'

class FilteringUser extends Component {

    addToFilteredList(userId, userName, allFilteredList, usersAvailableList){
        this.props.dispatch(addUserToFilteredList(userId, userName, allFilteredList))
        this.props.dispatch(removeUserFromFilteringList(userId, usersAvailableList))
        this.props.dispatch(emptySearchInput())
    }

    render(){

        var userName = this.props.ownProps.userName
        var userId = this.props.ownProps.userId
        var allFilteredList = this.props.allFilteredList
        var usersAvailableList = this.props.usersAvailableList

        return(
            <div className="filtering-user-container" onClick={ this.addToFilteredList.bind(this, userId, userName, allFilteredList, usersAvailableList) }>
                <div className="instead-of-img"><span>T</span></div>
                <div className="message-author">{userName}</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        userId: state.userReducer.userId,
        allFilteredList: state.groupReducer.allFilteredList,
        usersAvailableList: state.groupReducer.usersAvailableList
    }
}

export default connect(mapStateToProps)(FilteringUser)
