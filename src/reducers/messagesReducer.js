const initialState = {
    conversations: [],
    messages: [],
    currentConversation: {},
    users: [],
    user: {
        conversationId: null,
        userId: null
    },
    fetching: false,
    fetched: false,
    sending: false,
    sent: false,
    error: null,
    currentConversationId: null,
    message: null,
    senderId: null
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIDEBAR_CONVERSATIONS_FETCHING': {
            return {...state, fetching: true}
        }
        case 'SIDEBAR_CONVERSATIONS_FETCHED': {
            return {...state,
                    fetching: false,
                    fetched: true,
                    conversations: action.payload
                    }
        }
        case 'SIDEBAR_CONVERSATIONS_INFORMATION_ERROR': {
            return {...state,
                    fetching: false,
                    error: action.payload
                    }
        }
        case 'SET_CURRENT_CONVERSATION_ID': {
            return {...state, currentConversationId: action.payload}
        }
        case 'SET_CURRENT_CONVERSATION': {
            return {...state, currentConversation: action.payload}
        }
        case 'MESSENGER_CONVERSATION_MESSAGES_FETCHING': {
            return {...state, fetching: true}
        }
        case 'MESSENGER_CONVERSATION_MESSAGES_FETCHED': {
            return {...state,
                    fetched: true,
                    fetching: false,
                    messages: action.payload
                    }
        }
        case 'ADDING_MESSAGE_TO_CONVERSATION': {
            return {...state, sending: true }
        }
        case 'ADDED_MESSAGE_TO_CONVERSATION': {
            return {...state,
                    sending: false,
                    sent: true
                    }
        }
        case 'ADDING_MESSAGES_TO_CONVERSATION_ERROR': {
            return {...state,
                    sending: false,
                    error: action.payload
                    }
        }
        default:
            return state
    }
}

export default messagesReducer