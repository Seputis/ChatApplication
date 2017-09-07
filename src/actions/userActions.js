import axios from 'axios'

export function sendUserId(userId) {
    return ((dispatch) => {
        dispatch({ type: 'USER_ID_SENT', payload: userId })
    })
}

export function getUserData(userId) {
    return ((dispatch) => {
        dispatch({ type: 'USER_INFORMATION_FETCHING' })
        axios.get("http://assignment.bunq.com/user/" + userId)
        .then((response) => {
            dispatch({ type: 'USER_INFORMATION_FETCHED', payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: 'USER_INFORMATION_FETCHING_ERROR', payload: err })
        })
    })
}

export function getUsers() {
    return((dispatch) => {
        dispatch({ type: 'GETTING_USERS' })
        axios.get("http://assignment.bunq.com/users")
        .then((response) => {
            dispatch({ type: 'GOT_USERS', payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: 'USER_INFORMATION_FETCHING_ERROR', payload: err })
        })
    })
}

export function loginError() {
    return((dispatch) => {
        dispatch({ type: 'LOGIN_ERROR' })
    })
}