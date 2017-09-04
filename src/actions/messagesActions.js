import axios from 'axios'
import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'; // so I can use fetch()


export function getSidebarConversations(userId) {
    return ((dispatch) => {
        dispatch({ type: 'SIDEBAR_CONVERSATIONS_FETCHING' })
        axios.get("http://assignment.bunq.com/conversation/user/" + userId)
        .then((response) => {
            dispatch({ type: 'SIDEBAR_CONVERSATIONS_FETCHED', payload: response.data })
            dispatch({ type: 'SET_CURRENT_CONVERSATION_ID', payload: response.data[0].conversation.conversationId })
        })
        .catch((err) => {
            dispatch({ type: 'SIDEBAR_CONVERSATIONS_INFORMATION_ERROR', payload: err })
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
        })
        .catch((err) => {
            dispatch({ type: 'ADDING_MESSAGES_TO_CONVERSATION_ERROR', payload: err })
        })
    })
}