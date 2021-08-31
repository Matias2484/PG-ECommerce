import React from 'react'
import {Link} from 'react-router-dom'
import './cardOrdenes.css'
export default function CardOrdenes({props}){
    const {user,_id,productos,estado,valorTotal,fecha,admin}=props

    return (
        
        <div className="pedidosUser">
            <Link className="linkCompra" to={`/ordenes/detail/${_id}`}><h2>compra</h2></Link>
            <p className='numCompra'> N° de compra {_id}</p>
            <div>
                {admin && <p>{`${user.nombre} ${user.apellido}`}</p>}
                <p>{`fecha de compra: ${new Date(fecha).toDateString()}`}</p>
                <label>Estado:{estado}</label>
                <div>
                    <h4>Productos</h4>
                    {productos.map(e=><p key={e._id}>{`${e.titulo} ${e.cantidad} U`}</p>)}
                </div>
                <label>{valorTotal}</label>
            </div>
            
        </div>
        
    )
}
