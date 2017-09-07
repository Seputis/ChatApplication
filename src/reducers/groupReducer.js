const initialState = {
    creating: false,
    buttonAppear: false,
    filteringList: [],
    usersAvailableList: [],
    allFilteredList: [],
    input: '',
    inputForSidebar: '',
    error: null
}

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_GROUP_CREATING_TO_TRUE': {
            return {...state, creating: true}
        }
        case 'CHANGE_GROUP_CREATING_TO_FALSE': {
            return {...state, creating: false}
        }
        case 'INITIALIZE_USERS_AVAILABLE_LIST': {
            return {...state, usersAvailableList: action.payload}
        }
        case 'FILTERING_USER_LIST': {
            return {...state, filteringList: action.payload}
        }
        case 'FILTERED_USER_LIST': {
            return {...state, allFilteredList: action.payload}
        }
        case 'CHANGING_USERS_AVAILABLE_LIST': {
            return {...state, usersAvailableList: action.payload}
        }
        case 'EMPTY_SEARCH_INPUT': {
            return {...state, input: '' }
        }
        case 'EMPTY_SIDEBAR_INPUT': {
            return {...state, inputForSidebar: '' }
        }
        case 'USER_SEARCH_INPUT_VALUE': {
            return {...state, input: action.payload}
        }
        case 'SIDEBAR_SEARCH_INPUT_VALUE': {
            return {...state, inputForSidebar: action.payload}
        }
        case 'BUTTON_APPEAR': {
            return {...state, buttonAppear: true}
        }
        case 'BUTTON_HIDE': {
            return {...state, buttonAppear: false}
        }
        case 'CREATING_CONVERSATION_ERROR': {
            return {...state, error: action.payload}
        }
        default:
            return state
    }
}

export default groupReducer