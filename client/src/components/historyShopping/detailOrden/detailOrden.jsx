import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router";
import Select from 'react-select';
import {Link} from 'react-router-dom'
import './detailOrden.css'
import {getOrdenesID,updateOrden, seeCart} from '../../../Actions/index'
import { payloadJWT } from '../../../funciones/storage/payloadJWT'

export default function DetailOrdenAdmin (){

    const dispatch = useDispatch()
    const {id} = useParams();
    const state = useSelector(state => state.ordenDetail)
    let token= window.localStorage.getItem('token')
    const {admin}=payloadJWT()

    const{user,productos}=state

    var opcion1=[{ value:'cancelada',label:'cancelada'},{ value:'procesando',label:'procesando'}]
    var opcion2=[{ value:'cancelada',label:'cancelada'},{ value:'completada',label:'completada'}]

    

    useEffect(() => {
        dispatch(getOrdenesID(id))
        dispatch(seeCart())
    }, [dispatch,id])
    return (
        <div className='detailCompra'>
            { state.user ?(<div>
                <div>
                    <h2>Datos del comprador</h2>
                    <p className='datosUser'>{`${user.nombre} ${user.apellido}`}</p>
                    <p className='datosUser'>{`${user.email}`}</p>
                </div>
                <div>
                    <h2>Datos de la compra</h2> 
                    <label>N° de compra: {state._id}</label>
                    <p>fecha: {new Date(state.fecha).toDateString()}</p>
                <div>
                    <p>Productos</p>
                    {productos.map(e=>(
                        <div key={e._id}>
                            <Link to={`/details/${e.producto._id}`}><p>{`${e.producto.titulo} ${e.producto.precio}`}</p></Link>
                            <p>{e.cantidad}U</p>
                            <p>{e.cantidad * e.producto.precio}</p>

                        </div>
                    ))}
                    <p>Precio Total: {state.valorTotal}</p>
                </div>
                </div>
                <div>
                    <h2>Direccion De envio</h2>
                    <p>{state.direccion}</p>
                </div>
                <div>
                  <p>estado del pedido: {state.estado}</p>
                   {admin && state.estado!=='completada' && state.estado!=='cancelada' &&<Select
                        options={state.estado==='creada'? opcion1 : opcion2}
                        onChange={(e)=>dispatch(updateOrden(e.value,state._id,token))}
                    />}
                </div>
            </div>):(<p>Cargando...</p>)}
        </div>
    )
}
