import {
    GET_BOOKS
} from '../Actions/index';

const initialState = {
    allBooks: [],
    filteredAllBooks: [],
    details: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return{
                ...state,
                allBooks: action.payload,
                filteredAllBooks: action.payload
            }
    
        default: return state
    }
}

export default rootReducer;