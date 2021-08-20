import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrdenesUser, getOrdenes} from '../../Actions/index'
import { payloadJWT } from '../../funciones/payloadJWT'
import CardOrdenesAdmin from './cardOrdenes/cardOrdenes'

export default function HistoryShopping(){
    const token= window.localStorage.getItem('token')
    const dispatch = useDispatch()
    const ordenesDeCompras= useSelector(state => state.ordenes)
    let user=true
 useEffect(() => {
    // var user= payloadJWT(token)
    // user.admin? dispatch(getOrdenes()): dispatch(getOrdenesUser(token))
    dispatch(getOrdenes())
 }, [])

    return (
        <div>
            {!user.admin ?( <div>
                <h2>Historial de Pedidos</h2>
                <div>
                {ordenesDeCompras.map(e=> <CardOrdenesAdmin props={e} key={e._id}/>)} 
                </div>
        </div>):
           ( <div>
                <h2>Hitorial de compras</h2>
                <div>
                    <button>ordenar por creadas</button>
                </div>
               
            </div>)
            }
           
        </div>
    )
}
