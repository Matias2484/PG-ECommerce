import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getWhishlist,deleteWhishlist} from '../../Actions/index'
import Producto from '../producto/producto'
import { payloadJWT } from '../../funciones/storage/payloadJWT'

export default function Whishlist () {
    
    const token= window.localStorage.getItem('token')
    const dispatch = useDispatch()
    const state = useSelector(state => state.whishlist)
    useEffect(() => {
        dispatch(getWhishlist(token))
    }, [])

    return (
        <div>
           {state.map(e=><Producto 
           key={e.producto._id}
           titulo={e.producto.titulo} 
           autor={e.producto.autor} 
           img={e.producto.img} 
           precio={e.producto.precio}
           id={e.producto._id}
           stock={'whishlist'}
            />)}
        </div>
    )
}
