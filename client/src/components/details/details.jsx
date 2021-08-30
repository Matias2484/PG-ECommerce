import './details.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getDetails, url, addCart, seeCart} from '../../Actions';
import { NavLink } from 'react-router-dom';
import ReviewForm from './review/reviewForm/reviewForm';
import gif_carga from "../../img/libros_paginas.gif";
import {payloadJWT} from "../../funciones/payloadJWT"

export default function Details() {
    
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();
    

    


      var a=payloadJWT()
   

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(url(window.location.href))
        dispatch(seeCart())
    }, [dispatch, id]);

    const { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio, _id, review } = details;
    

   
    if(review) {
    
        
    var estrellas = (estrellita) => {
        let estrellas = [];
        for (let i = 0; i < estrellita; i++) {
            estrellas.push(<p className="estrellas">★</p>)
            
        }
        return estrellas
    }  
}



    if(titulo) {
        
        return (
            <div className='details'>
                <div className="detalles_izq">
                    <img className="imagen_detail" src={img} alt={`imagen de portada del libro: ${titulo}`} />
                    
                    <h3 className="autor_detail">{autor}</h3>
                    <div className="detail_info">
                        <div>
                            <p className="generos_detail">Generos:</p>
                            <p className="detail_texto">{generos.join(", ")}</p>
                        </div>
                        <div>
                            <p>Idioma: </p>
                            <p className="detail_texto"> {idioma}</p>
                        </div>
                        <div>
                            <p >Paginas: </p>
                            <p className="detail_texto">{paginas}</p>
                        </div>
                        <div>
                            <p>Publicación:</p>
                            <p className="detail_texto">{new Date(fecha).toDateString()}</p>
                        </div> 
                      { a && a.admin===true? <button className="boton_editar"><NavLink className="btn_editar" style={{textDecoration:'none'}} to={`/edit/${_id}`} >Edit</NavLink></button>:null}

                    </div>
                </div>
                <div className="contenido_details">
                    <div className="comprar">
                        {a && a.admin===false?<button className={stock<= 0? "vacio_detail": "comprar_detail"} onClick={()=>dispatch(addCart(id))}>Comprar</button>:null}
                       
                    </div>
                    <h2 className="titulo_detail">{titulo}</h2>
                    <div className="autor_editorial">
                        <h3 className="autor_detail_der">{autor}</h3>
                        <p className="guion_der">-</p>
                        <p className="editorial_der">{editorial}</p>
                    </div>
                    <div className='precio_detalle'>
                        <p className="precio_peso">$</p>
                        <p className="precio_numero">{precio}</p>
                    </div>
                    <div className='stock'>
                        <p className={stock<= 0? "stock_vacio": "stock_unidad"}>{stock<=0? "No hay unidades disponibles":`Quedan ${stock} unidades`}</p>
                    </div>
                    <div className='descripcion'>
                        <p className="descripcion_titulo">Reseña del Libro</p>
                        <p className="descripcion_contenido">{descripcion}</p>
                      
                    </div>
                    <div className="opiniones">
                    <h2 className="titulo_valoracion">Opiniones de nuestros lectores</h2>
                    {review &&  <div> 
                        {review.map((r,i)=> { return (
                            <div key={i} className="valoraciones">
                            <h4>{r.nombre + " " + r.apellido}</h4>
                            <p>{estrellas(r.valoracion)}</p>
                            <p className="comentario_usuario">" {r.comentario} "</p>
                            </div>
                            
                        )
                        })}
                        </div>
                        }
                    </div>
                    {a && !a.admin && <div><ReviewForm /></div>}
                </div>
            </div>
        )
    } else {
        return <img src={gif_carga} alt="Cargando..."/>
    }
}