import './details.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getDetails } from '../../Actions';

export default function Details() {

    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();
   
    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    let { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio } = details;

    if(titulo) {
    return (
        <div className='details'>
            <h2>{titulo}</h2>
            <h3>{autor}</h3>
            <img src={img} alt={`imagen de portada del libro: {${titulo}}`} />
            <div classname='descripcion'>
                <p>Descripción</p>
                <p>{descripcion}</p>
            </div>
            <div className='commontextDetails'>
                <p>Generos:</p>
                <p>{generos}</p>
            </div>
            <div className='commontextDetails'>
                <p>Fecha de lanzamiento:</p>
                <p>{fecha.substring(0, 10)}</p>
            </div>
            <div className='commontextDetails'>
                <p>Editorial:</p>
                <p>{editorial}</p>
            </div>
            <div className='commontextDetails'>
                <p>Paginas:</p>
                <p>{paginas}</p>
            </div>
            <div className='commontextDetails'>
                <p>Idioma:</p>
                <p>{idioma}</p>
            </div>
            <div className='commontextDetails'>
                <p>Precio:</p>
                <p>{precio}</p>
            </div>
            <div className='commontextDetails'>
                <p>Stock:</p>
                <p>{stock}</p>
            </div>
        </div>
    )
} else {
    return <h1>cargando</h1>
   
}
}

