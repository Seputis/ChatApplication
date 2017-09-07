import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeUserFromFilteredList,
         addUserToFilteringList, 
         emptySearchInput } from '../actions/groupActions'

class FilteredUser extends Component {

    removeFromFilteredList(userId, userName, allFilteredList, usersAvailableList){
        this.props.dispatch(removeUserFromFilteredList(userId, userName, allFilteredList))
        this.props.dispatch(addUserToFilteringList(userId, userName, usersAvailableList))
        this.props.dispatch(emptySearchInput())
    }

    render(){

        var name = this.props.ownProps.name
        var userId = this.props.ownProps.userId
        var allFilteredList = this.props.allFilteredList
        var usersAvailableList = this.props.usersAvailableList

        return(
            <div className="filtering-user-container" onClick={this.removeFromFilteredList.bind(this, userId, name, allFilteredList, usersAvailableList)}>
                <div className="instead-of-img"><span>T</span></div>
                <div className="message-author">{name}</div>
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

export default connect(mapStateToProps)(FilteredUser)
