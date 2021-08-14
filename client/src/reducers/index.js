import {
    GET_BOOKS,FIND_BYCATEGORY,
    DETAILS
} from '../Actions/index';


const initialState = {
  allBooks: [],
  filteredAllBooks: [],
  details: {}
};

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
                filteredAllBooks: state.filteredAllBooks.filter((book) => {
                    return book.generos.some((t) => t === action.payload);
                }),
            }; 
            

            case DETAILS:

                return {
                ...state,
                details: state.allBooks.filter( book => book._id === action.payload)

            }
    
        default: return state
    }

}

export default rootReducer;
