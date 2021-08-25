import React from 'react'
import { Link } from 'react-router-dom'


export default function OpcionesAdmin (){

    return (
        <div>
            <Link to='/profiles' style={{textDecoration:'none'}}><p>Perfiles de Usuarios</p></Link>
            <Link to='/ordenes' style={{textDecoration:'none'}}><p>Ordenes de Compras</p></Link>
            <Link to='/add' style={{textDecoration:'none'}}><p>Agregar Producto</p></Link>
        </div>
    )
}