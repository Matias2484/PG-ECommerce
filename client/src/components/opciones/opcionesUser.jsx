import React from 'react'
import { Link } from 'react-router-dom'
import { payloadJWT } from '../../funciones/payloadJWT'


export default function OpcionesUser (){
    let token=payloadJWT()
    return (
        <div>
            <Link to={`/profile/${token.uid}`} style={{textDecoration:'none'}}><h3>Perfil</h3></Link>
            <Link to='/ordenes' style={{textDecoration:'none'}}><h3>Historial de Compras</h3></Link>
        </div>
    )
}