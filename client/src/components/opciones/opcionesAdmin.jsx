import React from 'react'
import { Link } from 'react-router-dom'
import './opcionesAdmin.css'

export default function OpcionesAdmin (){

    return (
        <div className="opcionesAdmin">
            <h1>Bienvenido Admin</h1>
             <Link to='/profiles' style={{textDecoration:'none'}}><p className="perfiles">Perfiles de Usuarios</p></Link>
             <Link to='/ordenes' style={{textDecoration:'none'}}><p className="ordenes">Ordenes de Compras</p></Link>
             <Link to='/add' style={{textDecoration:'none'}}><p className="agregar">Agregar Producto</p></Link>
             <Link to='/categorias' style={{textDecoration:'none'}}><p className="categorias">Categorias</p></Link>
        </div>
    )
}