import {
    EJEMPLO
} from '../actions';

const store = {
    catalogo: [],
    catalogoFiltrado: [],
    detalles: {}
}

function rootReducer(state = store, action) {
    if(action.type === EJEMPLO) {
        return {
            ...state,
            
        }
    }
    return state;
}