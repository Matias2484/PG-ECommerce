import { Route, Switch, Redirect} from "react-router-dom";
import Home from "./components/home/home";
import Details from "./components/details/details";
import NavBar from "./components/navBar/navBar";
import './App.css';
import React from 'react';
import CreateProducto from './components/createProducto/createProducto'
import checkCart from './components/cart/checkCart/checkCart'
import EditProduct from './components/editProducto/editProducto'
import HistoryShopping from './components/historyShopping/historyShopping'
import DetailOrden from './components/historyShopping/detailOrden/detailOrden'
import Profiles from './components/perfiles/perfilesAdmin'
import Perfil from './components/perfiles/perfil'
import Sucursales from "./components/sucursales/sucursales";
import RegisterForm from "../src/components/registerForm/registerForm"
import {payloadJWT} from './funciones/payloadJWT'


function App() {
  
    var a = payloadJWT()


  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Home}/>
      <Route path='/details/:id' component = {Details} />
      <Route path= '/check' component={checkCart} />      
      <Route path='/sucursales' component={Sucursales} />
      <Route path='/registerUser' component={RegisterForm}/>
      <Switch>
         <Route path= '/add' render={()=>{
              return a && a.admin === true ? <CreateProducto/> : <Redirect to='/'/>
            }}
          />
          
           <Route path= '/edit/:id' render={()=>{
              return a && a.admin === true ? <EditProduct/> : <Redirect to='/'/>
            }}
          />
          <Route path='/profiles' render={()=>{
              return a && a.admin === true ? <Profiles /> : <Redirect to='/'/>
            }}
          />
          <Route exact path='/ordenes' render={()=>{
              return a ?  <HistoryShopping /> : <Redirect to='/'/>
            }}
          />
          <Route path='/ordenes/detail/:id' render={()=>{
              return a ? <DetailOrden/> : <Redirect to='/'/>
            }}
          />
          <Route path='/profile/:id' render={()=>{
              return a? <Perfil/> : <Redirect to='/'/>
            }}
          />
          
      </Switch>
    </div>
  );
}

export default App;
