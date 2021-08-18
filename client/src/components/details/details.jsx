import './details.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getDetails, url, addCart,} from '../../Actions';
import { Link } from 'react-router-dom';
export default function Details() {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(url(window.location.href))
    }, [dispatch, id]);

    const { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio, } = details;
    useEffect(() => {
        dispatch(getDetails(id));
    }, [details,dispatch,id])

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
        <p className="detail_texto">{fecha.substring(0, 10)}</p>
    </div> 
    </div>
</div>

        <div className="contenido_details">
            <div className="comprar">
            <button className={stock=== 0? "vacio_detail": "comprar_detail"} onClick={()=>dispatch(addCart(id))}>Comprar</button>
            <p className={stock=== 0? "vacio_detail": "comprar_carrito"}>Agregar a la Cesta</p>
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
            
            <p className={stock=== 0? "stock_vacio": "stock_unidad"}>{stock===0? "No hay unidades disponibles":`Quedan ${stock} unidades`}</p>
        </div>
        <div className='descripcion'>
            <p className="descripcion_titulo">Reseña del Libro</p>
            <p className="descripcion_contenido">{descripcion}</p>
            <Link to='/edit'>Edit</Link>
        </div>
        
        </div>
    </div>
    )
} else {
    return <h1>cargando</h1>
}
}

