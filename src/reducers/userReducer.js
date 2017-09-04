const initialState = {
    users: [],
    userName: null,
    userId: null,
    fetching: false,
    fetched: false,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_ID_SENT': {
            return {...state,
                    userId: action.payload}
        }
        case 'USER_INFORMATION_FETCHING': {
            return {...state,
                    fetching: true
                    }
        }
        case 'USER_INFORMATION_FETCHED': {
            return {...state,
                    fetching: false,
                    fetched: true,
                    userName: action.payload.name,
                    userId: action.payload.id 
                    }
        }
        case 'USER_INFORMATION_FETCHING_ERROR': {
            return {...state,
                    fetching: false,
                    error: action.payload
                    }
        }
        case 'GETTING_USERS': {
            return {...state,
                    fetching: true
                    }
        }
        case 'GOT_USERS': {
            return {...state,
                    fetched: true,
                    fetching: false,
                    users: action.payload
                    }
        }
        default:
            return state
    }
}

export default userReducer