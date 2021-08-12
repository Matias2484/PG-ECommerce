import {
    GET_BOOKS, FIND_BYCATEGORY
} from '../actions/index';

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
        case FIND_BYCATEGORY:
            return{
                ...state,
                filteredAllBooks: state.filteredAllBooks.filter(book =>{

                    for( let i=0 ; i < book.generos.length ; i++ ) {
                        for( let j=0 ; j < action.payload.length ; j++ ) {
                            if( book.generos[i] === action.payload[j] ) return true;
                        }
                    }
                    return false;
                }) 
            }
    
        default: return state
    }
}

export default rootReducer;