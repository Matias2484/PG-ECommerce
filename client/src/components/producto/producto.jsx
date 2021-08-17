import React from "react";
import "./producto.css";
import { Link } from "react-router-dom";
import {editBook} from "../../Actions"
import { useDispatch } from "react-redux";

export default function Producto({ titulo, autor, img, precio, id }) {
  const dispatch = useDispatch()
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
        <div>
          <p className="precio"><span className="peso">$:</span> {precio}</p>
        </div>
        <button onClick={()=> dispatch(editBook(id))}></button>{/* agregar estilo para que renderice el boton */}
      </div>
      
    </div>
  );
}
