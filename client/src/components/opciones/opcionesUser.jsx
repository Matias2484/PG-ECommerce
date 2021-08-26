import React from 'react'
import { Link } from 'react-router-dom'
import { payloadJWT } from '../../funciones/payloadJWT'

import './opcionesUser.css'
import { useSelector } from 'react-redux'

export default function OpcionesUser (){
    const state = useSelector(state => state.profile)
    let token=payloadJWT()
    console.log(token)
    return (
        <div>
            <h1 className="welcome" >¡Bienvenido {state.nombre}!</h1>
            <br />
            <div className="photoContainer">
            <img src={state.foto} alt="profilePhoto" className="profilePhoto" />
            </div><br />
            <Link to={`/profile/${token.uid}`} style={{textDecoration:'none'}} ><h2 className="perfilGo">Ver perfil</h2></Link>
            <Link to='/ordenes' style={{textDecoration:'none'}} ><h2 className="historialGo">Historial de Compras</h2></Link>
        </div>
    )
}