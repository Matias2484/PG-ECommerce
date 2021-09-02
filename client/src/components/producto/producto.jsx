import React from "react";
import {useDispatch } from "react-redux";
import {deleteWhishlist, postWhishlist} from "../../Actions";
import "./producto.css";
import { NavLink } from "react-router-dom";

export default function Producto({ titulo, autor, img, precio, id, stock, promo}) {
  const dispatch = useDispatch()
  const token= window.localStorage.getItem('token')
  return (
    
    <div className="libro">

      {stock==='whishlist' ? <button onClick={()=>dispatch(deleteWhishlist(id,token))}>Eliminar</button> : <button onClick={()=>dispatch(postWhishlist(id,token))}>add Whishlist</button>}
      <NavLink style={{textDecoration:"none"}}className="libro_link" to={`/details/${id}`}>
      <div className="producto_descuento">
           {promo ? <p>Oferta</p>: null}
        </div>
      <div className="producto">
        <div>
          <img className="imagen" src={img} alt={titulo}></img>
        </div>
        <div>
          <h2 className="titulo">{titulo}</h2>
        </div>
        <div>
          <p className="autor">{autor}</p>
        </div>
        
        {stock >= 0? <div>
          <p className="precio"><span className="peso">$:</span> {precio}</p>
        </div>:(stock !== 'whishlist' && <div className="vacio">No hay unidades disponibles</div>)} 
      </div> 
      </NavLink>
    </div>
    
  );
}
