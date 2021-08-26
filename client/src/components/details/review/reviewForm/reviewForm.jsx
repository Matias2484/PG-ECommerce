import React from 'react';
import Valoracion from "../valoracion/valoracion";
import Comentarios from "../comentarios/comentarios";
import { useSelector } from 'react-redux';
import {insertaReview} from '../../../../funciones/insertarReview'
import "./reviewForm.css"

export default function ReviewForm() {

    const details = useSelector((state) => state.details);
    let respuestaDelBack;
    
    async function handleSubmitReview(e){
        e.preventDefault();
        let valoracion = 0;
        for( let i=0 ; i<5 ; i++ ) {
            let starStatus = e.target[i].checked
            if( starStatus ) valoracion++;
        }
        let review = {
            userId: 1,
            _id: details._id,
            valoracion,
            comentario: e.target[5].value
        }
        respuestaDelBack = await insertaReview(review);
        console.log(respuestaDelBack)
    }

    return (
        <form onSubmit={ (e) => handleSubmitReview(e) }>
            <Valoracion />
            <Comentarios />
            <input className="btn_review" type="submit" value='Enviar' />
        </form>
    )
}