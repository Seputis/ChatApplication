import axios from 'axios'

export function initialState(userId) {
    return ((dispatch) => {
        let usersArray = []
        let currConvId = null
        
        dispatch({ type: 'SPINNER_TRUE' })
        dispatch({ type: 'USER_INFORMATION_FETCHING' })
        axios.get("http://assignment.bunq.com/user/" + userId)
        .then((response) => {
            dispatch({ type: 'USER_INFORMATION_FETCHED', payload: response.data })
            dispatch({ type: 'GETTING_USERS' })
            axios.get("http://assignment.bunq.com/users")
            .then((response) => {
                dispatch({ type: 'GOT_USERS', payload: response.data })
                var availableUsers = []

                for(var key in response.data) {
                    if(response.data[key]['id'] == userId) {
                        continue
                    } else {
                        availableUsers.push(response.data[key])
                    }
                }

                dispatch({ type: 'INITIALIZE_USERS_AVAILABLE_LIST', payload: availableUsers })

                for(var x in response.data) {
                    usersArray.push(response.data[x])
                }

                dispatch({ type: 'SIDEBAR_CONVERSATIONS_FETCHING' })
                axios.get("http://assignment.bunq.com/conversation/user/" + userId)
                .then((response) => {
                    dispatch({ type: 'SIDEBAR_CONVERSATIONS_FETCHED', payload: response.data })
                    var lastItem = response.data.length - 1
                    dispatch({ type: 'SET_CURRENT_CONVERSATION_ID', payload: response.data[lastItem].conversation.conversationId })
                    dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHING' })
                    axios.get("http://assignment.bunq.com/conversation/" + response.data[lastItem].conversation.conversationId + "/message/limited?limit=50&offset=0")
                    .then((response) => {
                        dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHED', payload: response.data })
                        dispatch({ type: 'GET_LAST_SEEN_FOR_CONVERSATION', payload: usersArray })
                        dispatch({ type: 'SPINNER_FALSE' })
                    })
                    .catch((err) => {
                        dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_ERROR', payload: err })
                    })
                })
                .catch((err) => {
                    dispatch({ type: 'SIDEBAR_CONVERSATIONS_INFORMATION_ERROR', payload: err })
                })
            })
            .catch((err) => {
                dispatch({ type: 'USER_INFORMATION_FETCHING_ERROR', payload: err })
            })
        })
        .catch((err) => {
            dispatch({ type: 'USER_INFORMATION_FETCHING_ERROR', payload: err })
        })
    })
}

export function changeCurrentConversation(convId) {
    return((dispatch) => {
        dispatch({ type: 'SET_CURRENT_CONVERSATION_ID', payload: convId })
        dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHING' })
        axios.get("http://assignment.bunq.com/conversation/" + convId + "/message/limited?limit=50&offset=0")
        .then((response) => {
            dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHED', payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_ERROR', payload: err })
        })
    })
}

export function addMessage(senderId, message, convId) {
    return((dispatch) => {
        dispatch({ type: 'ADDING_MESSAGE_TO_CONVERSATION' })
        axios.post("http://assignment.bunq.com/conversation/" + convId + "/message/send", {
            senderId: senderId,
            message: message
        })
        .then((response) => {
            dispatch({ type: 'ADDED_MESSAGE_TO_CONVERSATION' })
            dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHING' })
                    axios.get("http://assignment.bunq.com/conversation/" + convId + "/message/limited?limit=50&offset=0")
                    .then((response) => {
                        dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_FETCHED', payload: response.data })
                    })
                    .catch((err) => {
                        dispatch({ type: 'MESSENGER_CONVERSATION_MESSAGES_ERROR', payload: err })
                    })
        })
        .catch((err) => {
            dispatch({ type: 'ADDING_MESSAGES_TO_CONVERSATION_ERROR', payload: err })
        })
    })
}

export function changeCurrentConversationsBasedOnFilter(filteredList) {
    return((dispatch) => {
        dispatch({ type: 'CHANGE_CURRENT_CONVERSATIONS_BASED_ON_FILTER', payload: filteredList })
    })
}