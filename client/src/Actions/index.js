
export const GET_BOOKS = 'GET_BOOKS';
export const FIND_BYCATEGORY = 'FIND_BYCATEGORY';

export function getAllBooks(){
    return function(dispatch){
        return fetch(`http://localhost:4000/productos`)
        .then(response=> response.json())
        .then(json=>{
            dispatch({
            type:GET_BOOKS,
            payload:json
            })
        });
    };
};

export function createProduct(payload){

    return async function (dispatch){
        var book= await fetch('http://localhost:4000/productos',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        })
        const res= await book.json();
        return dispatch ({type: 'CREATE_PRODUCT', payload:res});
    };
};

export function createGender(payload){
    return async function(dispatch) {
        var gender= await fetch('http://localhost:4000/generos',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });
        const res= await gender.json();
        return dispatch({type:'CREATE_GENDER', payload:res})
    };
};

export function categoryFilter(generos){
    return{
        type: FIND_BYCATEGORY,
        payload:generos
    };
};