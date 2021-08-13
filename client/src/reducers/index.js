import {
    GET_BOOKS,
    FIND_BYCATEGORY,
    DETAILS,
    GET_GENDERS,
    CREATE_GENDER,
    CREATE_BOOK,
    EDIT_BOOK,
    ADD_CART,
    REMOVE_ONE_CART,
    REMOVE_ALL_CART,
    CLEAR_CART,
    ADD_BUY_USER
} from '../Actions/index';


const initialState = {
  allBooks: [],
  filteredAllBooks: [],
  genders:[],
  details: {},
  cart: []
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
                filteredAllBooks: state.filteredAllBooks.filter(book =>{

                    for( let i=0 ; i < book.generos.length ; i++ ) {
                        for( let j=0 ; j < action.payload.length ; j++ ) {
                            if( book.generos[i] === action.payload[j] ) return true;
                        }
                    }
                    return false;
                })}; 

        case DETAILS:
            return {
            ...state,
            details: state.allBooks.filter( book => book._id === action.payload)

        }
        case GET_GENDERS:
            return{
                ...state,
                genders: action.payload
            }
        case CREATE_BOOK:
            return{
                ...state,
                allBooks: [action.payload,...state.allBooks],
            }
        case CREATE_GENDER:
            return{
                ...state,
                genders:[action.payload, ...state.genders]
            }
        case EDIT_BOOK:
            return{
                ...state,
                allBooks:[action.payload, state.allBooks.filter(e=>e._id !== action.payload._id)],
                filteredAllBooks: [action.payload, state.filteredAllBooks.filter(e=>e._id !== action.payload._id)]
            }
            case ADD_CART:
                if(state.cart.length>1) {
                   var book= state.cart.findIndex(e=>e._id===action.payload._id)
                   book && state.cart[book].count++
                }
                return{
                    ...state,
                    cart: book? state.cart : [{...action.payload, count: 1}, ...state.cart]
                }
            case REMOVE_ONE_CART:
                var book= state.cart.findIndex(e=>e._id===action.payload)
                state.cart[book].count-1 !== 0 && state.cart[book].count-1
                return{
                    ...state,
                    cart: state.cart[book].count-1 === 0 ? state.cart.filter(e=> e._id !== action.payload) : state.cart
                }
            case REMOVE_ALL_CART:
                return{
                    ...state,
                    cart: state.cart.filter(e=> e._id !== action.payload)
                }
            case CLEAR_CART:
                return {
                    ...state,
                    cart: []
                }
            case ADD_BUY_USER:
                return {
                    ...state,
                    cart:[]
                }       
        default: return state
    }

}

export default rootReducer;
