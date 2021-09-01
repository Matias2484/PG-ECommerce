import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPromos } from '../../Actions/index';
import { deletePromo } from '../../funciones/delete';
import swal from 'sweetalert';

import {useHistory} from 'react-router-dom';

export default function PromoVigentes () {

    const dispatch = useDispatch();
    const history=useHistory()
    const state = useSelector(state => state.promo);
    var token= window.localStorage.getItem('token')

    useEffect(() => {
        dispatch(getPromos())
    }, [])
    
    async function eliminar(id) {
        var mando= await swal ( " ¿Seguro que quieres eliminarlo? " , { 
            dangerMode: true,
            buttons: {
                cancel: {
                  text: "Cancel",
                  value: false,
                  visible: true,
                  closeModal: true,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  closeModal: true
                }
              }
        })
        if(mando){
            await deletePromo(id,token) 
            swal ( " ¡Promo Eliminada! " , { 
                icon: "success",
                botón : false , 
              } ) ;
            history.push('/promos')                      
        }
    }
    
    return (
        <div>
            {state.map((e,i)=><div>
                <p>Promo {i+1}</p>
                <button onClick={()=>eliminar(e._id)}>Elminar</button>
                <p>De: {new Date(e.fechaInicio).toDateString()}  Hasta: {new Date(e.fechaFinal).toDateString()} </p>
                <div>
                    <p>Detalles</p>
                    <p>Categoria/s en Descuentos: {e.genero.join(',').replace(/,/g,' ')}</p>
                    <p>Dias de descuento: {e.dias.join(',')}</p>
                </div>
            </div>
            )}
        </div>
    )
}
