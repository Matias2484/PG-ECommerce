import fetch from 'node-fetch';
export const GET_BOOKS = 'GET_BOOKS';

export function getAllBooks(){
    return function(dispatch){
    return fetch(`http://localhost:3001/`)
    .then(response=> response.json())
    .then(json=>{
        dispatch({
        type:GET_BOOKS,
        payload:json
        })
    })
} 
}   