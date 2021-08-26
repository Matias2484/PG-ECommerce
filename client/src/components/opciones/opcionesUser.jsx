import React from 'react'
import { Link } from 'react-router-dom'
import { payloadJWT } from '../../funciones/payloadJWT'


export default function OpcionesUser (){
    let token=payloadJWT()
    return (
        <div>
            <Link to={`/profile/${token.uid}`} style={{textDecoration:'none'}}><p>Perfil</p></Link>
            <Link to='/ordenes' style={{textDecoration:'none'}}><p>Historial de Compras</p></Link>
        </div>
    )
}