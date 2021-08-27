import React from 'react';
import Valoracion from "../valoracion/valoracion";
import Comentarios from "../comentarios/comentarios";
import { useSelector } from 'react-redux';
import {insertaReview} from '../../../../funciones/insertarReview'
import { payloadJWT } from '../../../../funciones/payloadJWT';
import "./reviewForm.css"


export default function ReviewForm() {
  const token=window.localStorage.getItem('token')
    
    const details = useSelector((state) => state.details);


    
    async function handleSubmitReview(e){

        let valoracion = 0;
        for( let i=0 ; i<5 ; i++ ) {
            let starStatus = e.target[i].checked
            if( starStatus ) valoracion++;
        }
        
        let review = {
            
            _id: details._id,
            valoracion,
            comentario: e.target[5].value
        }
        
         insertaReview(review, token);
        

    }
   
    return (
        <form onSubmit={ (e) => handleSubmitReview(e) }>
            <Valoracion />
            <Comentarios />
            <input className="btn_review" type="submit" value='Enviar' />
        </form>
    )
}