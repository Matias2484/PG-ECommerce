import React from "react";
import "./producto.css";
import { NavLink } from "react-router-dom";

export default function Producto({ titulo, autor, img, precio, id, stock, promo}) {

  return (
    
    <div className="libro">
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
        </div>:<div className="vacio">No hay unidades disponibles</div>} 
      </div> 
      </NavLink>
    </div>
    
  );
}
