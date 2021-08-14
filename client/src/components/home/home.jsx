import "./home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenders } from "../../Actions/index";
import Producto from "../producto/producto";
import Filter from '../filter/filter';
import toLeft from '../../img/toLeft.png'
import toRight from '../../img/toRight.png';

let leftBarState = false;

function leftBarFunction(){
  
  let leftNavBar = document.getElementById('leftNavBar');
  let leftNavIcon = document.getElementById('leftNavIcon');

  if( leftBarState ){
    leftNavIcon.src = toRight;
    leftNavBar.style.left = '-400px';
    leftBarState = false;
  }else{
    leftNavIcon.src = toLeft;
    leftNavBar.style.left = '0px';
    leftBarState = true;
  }
}

export function Home () {
    const dispatch = useDispatch()
    const filteredAllBooks = useSelector((state) => state.filteredAllBooks);

    const [state, setState] = useState([]);

    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getGenders())
    },[dispatch])

  const [currentPage, setCurrentPage] = useState(0);
  var librosIniciales = filteredAllBooks.slice(currentPage, currentPage + 20);

  const nextPage = () => {
    setCurrentPage(currentPage + 20);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 20);
  };


  //Ordenado

  const selectOptionOrder = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  if (state.select === "A-Z") {
    filteredAllBooks.sort((a, b) => {
      if (a.titulo < b.titulo) {
        return -1;
      }
      if (a.titulo > b.titulo) {
        return 1;
      }
      return 0;
    });
  }
  if (state.select === "Z-A") {
    filteredAllBooks.sort((b, a) => {
      if (a.titulo < b.titulo) {
        return -1;
      }
      if (a.titulo > b.titulo) {
        return 1;
      }
      return 0;
    });
  }
  if (state.select === "Mayor_Precio") {
    filteredAllBooks.sort((b, a) => {
      if (a.precio < b.precio) {
        return -1;
      }
      if (a.precio > b.precio) {
        return 1;
      }
      return 0;
    });
  }
  if (state.select === "Menor_Precio") {
    filteredAllBooks.sort((a, b) => {
      if (a.precio < b.precio) {
        return -1;
      }
      if (a.precio > b.precio) {
        return 1;
      }
      return 0;
    });
  }

  return (

    <div className='principalHome'>
      <div className='mainNavBar'>
        <button id='leftNavBarButton' className='leftNavBarButton' onClick={ leftBarFunction }>
          <img id='leftNavIcon' src={toLeft} alt="panel dysplay icon" />
        </button>
        <div id='leftNavBar' className='leftNavBar'>
          <div className="botonesPaginadoOrdenado">
              {/* Ordenar por Nombre y Fuerza */}
              <div className="ordenado">
                <select id="select" onChange={selectOptionOrder}>
                  <option defaultValue>Ordenar por... </option>
                  <option id="A-Z" value="A-Z">
                    A-Z
                  </option>
                  <option value="Z-A">Z-A</option>

                  <option value="Mayor_Precio">Mayor Precio</option>
                  <option value="Menor_Precio">Menor Precio</option>
                </select>
              </div>
            </div>
        </div>
        <div className='searchMenu'>
          <p>soy el primer div</p>
        </div>
        <div className='rightNavBar'>
          <p>soy rightNavBar</p>
        </div>
      </div>
      <div className="home">
        <Filter/>
        <div className="paginado">
          {currentPage > 0 ? (
            <button className="botonPrev" onClick={prevPage}>
              Prev Page
            </button>
          ) : null}
          {currentPage < 80 ? (
            <button className="botonNext" onClick={nextPage}>
              Next Page
            </button>
          ) : null}
        </div>

        <div className="books">
          {librosIniciales.map((e, index) => (
            <Producto
              key={index + 1}
              titulo={e.titulo}
              img={e.img}
              autor={e.autor}
              precio={e.precio}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default Home;

