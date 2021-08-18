import React from "react";
import "./producto.css";
import { Link } from "react-router-dom";

export default function Producto({ titulo, autor, img, precio, id, stock }) {
  
  return (
    <div className="libro">
      <div className="producto">
        <div>
          <Link to={`/details/${id}`}>
          <img className="imagen" src={img} alt={titulo}></img>
          </Link>
        </div>
        <div>
          <h2 className="titulo">{titulo}</h2>
        </div>
        <div>
          <p className="autor">{autor}</p>
        </div>
        {stock !== 0? <div>
          <p className="precio"><span className="peso">$:</span> {precio}</p>

       
      

        </div>:<div className="vacio">No hay unidades disponibles</div>}
        
      </div> 

    </div>
  );
}
