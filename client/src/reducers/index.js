import {
    EJEMPLO
} from '../actions';

const initialState = {
    catalogo: [],
    catalogoFiltrado: [],
    detalles: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case EJEMPLO:
            
            break;
    
        default:
            break;
    }
}

export default rootReducer;