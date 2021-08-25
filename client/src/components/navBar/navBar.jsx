import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenders, orderBooks, searchByName, filterPrice, filterLanguage } from "../../Actions/index";
import './navBar.css'
import { MdMenu, MdShoppingCart, MdAccountCircle } from "react-icons/md";
import { RiSoundModuleFill  } from "react-icons/ri";
import { BsArrowLeftRight } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom"; 
import Cart from '../cart/cart'
import LoginForms  from "../loginForm/loginForms.jsx"; 
import {logaut} from "../../funciones/logaut"
import RegisterForm from "../registerForm/registerForm"
import { useHistory } from "react-router";
import {payloadJWT} from '../../funciones/payloadJWT'
import OpcionesUser from '../opciones/opcionesUser'
import OpcionesAdmin from "../opciones/opcionesAdmin";

export default function NavBar() {

    const dispatch = useDispatch();
    const orderAllBooks = useSelector((state) => state.filteredAllBooks);
    const url = useSelector((state) => state.url);
    const carts = useSelector((state)=>state.cart);
    const history=useHistory()


    


    if(window.localStorage.token) {
      var a = payloadJWT()
      
    }

    
    const token = window.localStorage.getItem("token")
  
    if(token) {
      var user=payloadJWT()}
    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getGenders())
    },[dispatch])

    const [leftBarState, setleftBarState] = useState(false);
    function leftBarFunction(){
      
      let leftNavBar = document.getElementById('leftNavBar');
      if( leftBarState ){
        leftNavBar.style.left = '-400px';
        setleftBarState(false);
      }else{
        leftNavBar.style.left = '0px';
        setleftBarState(true);
      }
      
    }
    

    const [rightBarState, setrightBarState] = useState(false);
    function rightBarFunction(){
      let rightNavBar = document.getElementById('rightNavBar');
      <Cart/>
      if( rightBarState ){
        
        rightNavBar.style.top = '-100vh';
        setrightBarState(false);

      }else{
        
        rightNavBar.style.top = '0px';
        setrightBarState(true);
      }
    }

    const [loginBarState, setloginBarState] = useState(false);
    function loginBarFunction(){
      let loginNavBar = document.getElementById('loginNavBar');
      if( loginBarState ){
        loginNavBar.style.top = '-100vh';
        setloginBarState(false);
      }else{
        loginNavBar.style.top = '0px';
        setloginBarState(true);
      }
    }
    

  //Ordenado
  const [state, setState] = useState([]);
  const selectOptionOrder = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
    
  useEffect(() => {
          dispatch(orderBooks(state.select, orderAllBooks))
         // eslint-disable-next-line
      }, [state.select])

      //busqueda
      const[busqueda, setBusqueda] = useState("")
      const handleChange = e =>{
        setBusqueda(e.target.value);
        dispatch(searchByName(e.target.value));
      }

      //filtro precio
      const[filtroPrecioIdioma, setfiltroPrecioIdioma] = useState({
        "min": "",
        "max": "",
      })

      const handleChangePrecio = (e) =>{
        setfiltroPrecioIdioma({
          ...filtroPrecioIdioma,
          [e.target.name]: e.target.value
        });
      }

      //evento onclick del boton de filtrar por precio
      const handleSubmit = (e) => {

        e.preventDefault();
        if(filtroPrecioIdioma.min && filtroPrecioIdioma.max){

          dispatch(filterPrice(filtroPrecioIdioma.min, filtroPrecioIdioma.max));
          setfiltroPrecioIdioma({
            "min": "",
            "max": "",
          })
        }
      }
      //filtro idioma
      const handleChangeCheckBox = (e) =>{
        dispatch(filterLanguage(e.target.value));
      }

      //POP-UP DE LOGIN
      const openModal = () => {
        let logModal = document.getElementById('logModal')
        let ninjaButton = document.getElementById('buttonsForms')
        logModal.style.opacity = '1';
        logModal.style.zIndex = '2'; 
        ninjaButton.style.opacity = '0';
        ninjaButton.style.zIndex = '1'
        
      }
      /* POP-UP DE REGISTRO */

      const openRegisModal = () => {
        let logModal = document.getElementById('regisModal')
        let ninjaButton = document.getElementById('buttonsForms')
        logModal.style.opacity = '1';
        logModal.style.zIndex = '2'; 
        ninjaButton.style.opacity = '0';
        ninjaButton.style.zIndex = '1'
      }
      
      const locaLogout = () => {
        logaut();
        loginBarFunction();
        history.push('/')
      }

  return (
  <div className="nav_principal">
    <div>
    <div className='mainNavBar'>
      {url === "http://localhost:3000/" ? (
        <div>
        
        <button className = {leftBarState === true ? "leftNavBarButton_active" : "leftNavBarButton_inactive"} onClick={ leftBarFunction }>
            <MdMenu className="icono_nav"/>
        </button>
            <div id='leftNavBar'>
              <h2 className="titulo_leftNavBar">Catálogo</h2>
            <div className="botonesPaginadoOrdenado">

                <div className="contenedor_filtrado">
                  <div className="filtrado_leftNavBar">
                    <RiSoundModuleFill className="filtrado_icon"/>
                    <h3 className="titulo_filtrado">Filtrar</h3>
                  </div>

                  <div className="filtrado_precio">
                    <h3 className="titulo_filtrado_precio">Precio</h3>
                    <div className="menu_filtrado_precio">
                      <input className="precio_min_input" type="number" required min='0' placeholder="Mínimo" name="min" value={filtroPrecioIdioma.min} onChange={handleChangePrecio}></input>
                      <BsArrowLeftRight className="precio_icon"/>
                      <input className="precio_max_input" type="number" required min='0' placeholder="Máximo" name="max" value={filtroPrecioIdioma.max} onChange={handleChangePrecio}></input>
                    </div>
                    <button className={filtroPrecioIdioma.min && filtroPrecioIdioma.max ? "button_filtrar_precio_activo" : "button_filtrar_precio_inactivo"} onClick={handleSubmit}>Filtrar</button>
                  </div>

                  <div className="filtrado_idioma">
                    <h3 className="titulo_filtrado_idioma">Idioma</h3>
                    <div className="menu_filtrado_idioma">
                      <div className="checkbox_filtro_idioma_es">
                        <p>Español</p>
                        <input type='radio' required autoComplete='off' name='idioma' value='es' onChange={handleChangeCheckBox}></input>
                      </div>
                      <div>
                        <p>Inglés</p>
                        <input className="checkbox_filtro_idioma_en" type='radio' required autoComplete='off' name='idioma' value='en' onChange={handleChangeCheckBox}></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contenedor_ordenado">
                    <h3 className="titulo_ordenado">Ordenar por:</h3>
                    <select id="select" onChange={selectOptionOrder}>
                    <option defaultValue>Selecionar</option>
                    <option id="A-Z" value="A-Z">
                        A - Z
                    </option>
                    <option value="Z-A">Z - A</option>

                    <option value="Mayor_Precio">Mayor a menor precio</option>
                    <option value="Menor_Precio">Menor a mayor precio</option>
                    </select>
                </div>
                </div>
              </div>
            </div>
      ) : null} 
      
                <div className='searchMenu'>
                    
                </div>
    <div className="titulo_principal">
      <NavLink  className="titulo_b" to={'/'}>
      <h1>B-Comm</h1>
      </NavLink>
            
        </div>  
        
        <div className="searchBar">
        <BiSearchAlt className="search-btn"/>
        <input className="search-input" type="text" placeholder="Buscar por título o autor..."
        autoComplete="on"
        value={busqueda}
        onChange={handleChange}/>
        </div>
        
          <div className="icono_Usuario">
          <div id={loginBarState === true ? "loginNavBarbutton_active" : "loginNavBarbutton_inactive"} className="loginNavBarbutton" onClick={ loginBarFunction }>
          <MdAccountCircle/>
          </div>
  <div id ="loginNavBar">

    <div id ="buttonsForms" >
      {!token?(<div>
         <button onClick={openModal} className="userLoginButton">Accede!</button>
         <button className="userLoginButton" onClick={openRegisModal}>Registrate!</button>
        </div>
       ):
      (<div>
        {user? user.admin ? <OpcionesAdmin /> : <OpcionesUser/>: null}
        <button onClick={locaLogout}  className="userLoginButton"> Cerrar Sesion </button>
        </div>)}

    </div>
    <LoginForms loginBarFunction={loginBarFunction} />
    <RegisterForm loginBarFunction={loginBarFunction}/>

</div>
</div>
       </div>
          {user && !user.admin && <div>
            <div id={rightBarState === true ? "rightNavBarButton_active" : "rightNavBarButton_inactive"} className="rightNavBarButton" onClick={ rightBarFunction }>
            <MdShoppingCart className="icono_nav_der"/> <span className="numero_icono">{Object.values(carts).length}</span>
            </div>           
            <div id ="rightNavBar">
            <Cart/>
            </div>
          </div>  }  

        </div>
      
    </div> 
  );
}
