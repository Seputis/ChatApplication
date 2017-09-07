const initialState = {
    noShow: false
}

const randomReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SPINNER_TRUE': {
            return {...state, noShow: true}
        }
        case 'SPINNER_FALSE': {
            return {...state, noShow: false}
        }
        default:
            return state
    }
}

export default randomReducer