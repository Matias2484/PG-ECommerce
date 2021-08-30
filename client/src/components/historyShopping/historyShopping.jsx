import React,{ useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrdenesUser, getOrdenes,seeCart} from '../../Actions/index'
import { payloadJWT } from '../../funciones/payloadJWT'
import CardOrdenes from './cardOrdenes/cardOrdenes'
import Select from 'react-select';
import './historyShopping.css'
export default function HistoryShopping(){
    const token= window.localStorage.getItem('token')
    const admin=payloadJWT()
    const dispatch = useDispatch()
    const ordenesDeCompras= useSelector(state => state.ordenes)
    const [ordenes, setordenes] = useState([])

 useEffect(() => {
    admin.admin ? dispatch(getOrdenes(token)) : dispatch(getOrdenesUser(token))
    dispatch(seeCart())
 }, [token,admin.admin,dispatch]);

 useEffect(() => {
    setordenes([...ordenesDeCompras])
 }, [ordenesDeCompras]);

 function filtrarOrdenes(estado){
    setordenes([...ordenesDeCompras].filter(e=>e.estado===estado))
 };

 const opcion=[{ value:'creada',label:'creada'},{ value:'cancelada',label:'cancelada'},{ value:'procesando',label:'procesando'},{ value:'completada',label:'completada'}]

    return (
        <div >
            {admin.admin ?(
            <div className='historialCompra'>
                <h2>Historial de Pedidos</h2>
                <div>
                        <p className='filtro'>Filtrar las compras por estado:</p>
                        <Select className='select'
                        options={opcion}
                        onChange={(e)=>filtrarOrdenes(e.value)}
                            />
                </div>
                <div className="historyShop"    >
                {ordenes.length>0? ordenes.map(e=> <CardOrdenes props={{...e,admin:true}} key={e._id}/>) : <p>Aun no hay compras realizadas</p>} 
                </div>
            </div>):
            ( <div className='historialCompra'>
                <h2>Hitorial de compras</h2>
                <div>
                <p className='filtro'>Filtrar las compras por estado:</p>
                <Select className='select'
                        options={opcion}
                        onChange={(e)=>filtrarOrdenes(e.value)}
                    />
                </div>
                <div  className="historyShop">
                {ordenes.length>0? ordenes.map(e=> <CardOrdenes props={{...e,admin:false}} key={e._id}/>):<p>Aun no hay compras realizadas</p>} 
                </div>
            </div>)
            }
        </div>
    )
}
