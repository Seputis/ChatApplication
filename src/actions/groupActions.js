import axios from 'axios'

export function changeMessengerToGroupCreation() {
    return ((dispatch) => {
        dispatch({ type: 'CHANGE_GROUP_CREATING_TO_TRUE' })
    })
}

export function changeMessengerToMessages() {
    return ((dispatch) => {
        dispatch({ type: 'CHANGE_GROUP_CREATING_TO_FALSE' })
    })
}

export function changeUserListBasedOnFilter(filteringList, userId) {
    var filter = []

    for(var key in filteringList) {
        if(filteringList[key]['id'] == userId) {
            continue
        } else {
            filter.push(filteringList[key])
        }
    }

    return((dispatch) => {
        dispatch({ type: 'FILTERING_USER_LIST', payload: filter })
    })
}

export function addUserToFilteredList(userId, userName, allFilteredList) {
    var obj = { id: userId, name: userName  }
    var finalPayload = allFilteredList.push(obj)

    return((dispatch) => {
        dispatch({ type: 'FILTERED_USER_LIST', payload: allFilteredList })
        if(finalPayload > 0)
            dispatch({ type: 'BUTTON_APPEAR' })
    })
}

export function removeUserFromFilteringList(userId, usersAvailableList, filteringList) {
    var availableUsers = []

    for(var key in usersAvailableList) {
        if(usersAvailableList[key]['id'] == userId) {
            continue
        } else {
            availableUsers.push(usersAvailableList[key])
        }
    }
    
    return((dispatch) => {
        dispatch({ type: 'CHANGING_USERS_AVAILABLE_LIST', payload: availableUsers })
        dispatch({ type: 'FILTERING_USER_LIST', payload: availableUsers })
    })
}

export function emptySearchInput() {
    return((dispatch) => {
        dispatch({ type: 'EMPTY_SEARCH_INPUT' })
    })
}

export function currentUserSearchInputValue(val) {
    return((dispatch) => {
        dispatch({ type: 'USER_SEARCH_INPUT_VALUE', payload: val })
    })
}

export function sidebarValueChanging(val) {
    return((dispatch) => {
        dispatch({ type: 'SIDEBAR_SEARCH_INPUT_VALUE', payload: val })
    })
}

export function createConversation(list, conversationName, userId) {
    return((dispatch) => {
        dispatch({ type: 'SPINNER_TRUE' })

        var userIds = userId + ', '
        var firstIteration = true;
        
        for(var key in list){
            if(firstIteration){
                userIds += list[key]['id'].toString()
                firstIteration = false;
            } else {
                userIds += ', ' + list[key]['id'].toString()
            }
        }

        if(conversationName) {
            var obj = { users: userIds, name: conversationName }
            axios.post("http://assignment.bunq.com/conversation/group", {
                users: userIds,
                name: conversationName
            }).then((response) => {
                console.log(response.data.id)
                var currConvId = response.data.id
                axios.get("http://assignment.bunq.com/conversation/user/" + userId)
                    .then((response) => {
                        console.log(response)
                        dispatch({ type: 'SIDEBAR_CONVERSATIONS_FETCHED', payload: response.data })
                        dispatch({ type: 'SET_CURRENT_CONVERSATION_ID', payload: currConvId })

                        dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHING' })
                        axios.get("http://assignment.bunq.com/conversation/" + currConvId + "/message/limited?limit=50&offset=0")
                            .then((response) => {
                                dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHED', payload: response.data })
                                dispatch({ type: 'SPINNER_FALSE' })
                            })
                            .catch((err) => {
                                dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_ERROR', payload: err })
                            })
                    })
                    .catch((err) => {
                        dispatch({ type: 'ADDING_MESSAGES_TO_CONVERSATION_ERROR', payload: err })
                    })
            })
            .catch((err) => {
                dispatch({ type: 'CREATING_CONVERSATION_ERROR', payload: err })
            })
        } 
    })
}

export function emptySidebarInput() {
    return ((dispatch) => {
        dispatch({ type: 'EMPTY_SIDEBAR_INPUT' })
    })
}

export function removeUserFromFilteredList(userId, userName, allFilteredList) {
    var availableUsers = []

    for(var key in allFilteredList) {
        if(allFilteredList[key]['id'] == userId) {
            continue
        } else {
            availableUsers.push(allFilteredList[key])
        }
    }

    return((dispatch) => {
        dispatch({ type: 'FILTERED_USER_LIST', payload: availableUsers })
        if(allFilteredList <= 1) {
            dispatch({ type: 'BUTTON_HIDE' })
        }
    })
}

export function addUserToFilteringList(userId, userName, usersAvailableList) {
    var obj = { id: userId, name: userName }
    usersAvailableList.push(obj)
    
    return((dispatch) => {
        dispatch({ type: 'CHANGING_USERS_AVAILABLE_LIST', payload: usersAvailableList })
        dispatch({ type: 'FILTERING_USER_LIST', payload: usersAvailableList })
    })
}

export function changeGroupCreationToMessenger(){
    return((dispatch) => {
        dispatch({ type: 'CHANGE_GROUP_CREATING_TO_FALSE' })
    })
}

export function refreshFilteringList(usersAvailableList){
    return((dispatch) => {
        dispatch({ type: 'FILTERING_USER_LIST', payload: usersAvailableList })
    })
}
