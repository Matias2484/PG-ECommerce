import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {editGenders} from '../../funciones/edit';
import {createGender} from '../../Actions/index'
import { deleteGenero } from "../../funciones/delete";
import {getGenders} from "../../Actions/index";
import swal from 'sweetalert';
import "./generos.css"

export default function Generos () {

    const dispatch = useDispatch()
    const genders = useSelector((state) => state.genders);
    const token = window.localStorage.getItem('token')
    const [state, setstate] = useState({
        create:'',
        cambio:''
    })
    useEffect(() => {
        dispatch(getGenders())
    },[dispatch, token])

    async function removeGenero(e) {
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
         await deleteGenero(e,token) 
            swal ( " ¡Categoria Eliminado! " , { 
                icon: "success",
                botón : false , 
              } ) ;     
            dispatch(getGenders())               
        }
    }
    function handleChange(e){
        e.preventDefault();
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function edit(e) {
        editGenders(state.cambio,e,token)  
        setstate({
            ...state,
            cambio:''
        })
        dispatch(getGenders())
    }

    function create() {
      dispatch(createGender({genero:state.create},token))
        setstate({
            ...state,
            create:''
        })
    }
    return (
        <div className="categorias_menu_admin">
            <h2 className="administrar_categorias">Administrar Categorías</h2>

            <div className="categorias_crear">
                <button onClick={(e)=>create()}>Crear Categoria</button><input type='text' name='create' value={state.create} onChange={(e)=> handleChange(e)} />
            </div>
            
            <div className="categorias_crear_map">
                {genders.map(e=><div className="genero_map" key={e}> 
                    <p className="genero_categoria">{e}</p>
                    <div className="botones_categoria">
                    <button className="eliminar_categoria"onClick={()=>removeGenero(e)}>Eliminar Categoría</button>
                    <div id={e}>
                        <div><input placeholder='Modificar Categoría' type='text' name='cambio' value={state.cambio} onChange={(e)=> handleChange(e)}  /></div>
                        <div><button className="guardar_categoria" onClick={()=>edit(e)}>Guardar Cambios</button></div>
                        
                        
                    </div>
                    </div>
                </div>)}
            </div>
            
        </div>
    )
}
