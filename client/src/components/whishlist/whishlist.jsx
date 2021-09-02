import React,{ useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getWhishlist} from '../../Actions/index'
import Producto from '../producto/producto'

export default function Whishlist () {
    
    const token= window.localStorage.getItem('token')
    const dispatch = useDispatch()
    const state = useSelector(state => state.whishlist)
    useEffect(() => {
        dispatch(getWhishlist(token))
    }, [state])

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
