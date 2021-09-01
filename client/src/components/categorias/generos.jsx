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
    const [state, setstate] = useState('')
    useEffect(() => {
        dispatch(getGenders())
    },[dispatch, token])

    function cambiar(e) {
        let input=document.getElementById(e)
        input.style={display:'hidden'}
    };

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
    function edit(e) {
        editGenders(state,e,token)
        dispatch(getGenders()) 
        setstate('')
    }

    function create() {
      dispatch(createGender({genero:state},token))
        setstate('')
    }
    return (
        <div className="categorias_menu_admin">
            <h2 className="administrar_categorias">Administrar Categorías</h2>

            <div className="categorias_crear">
                <button onClick={(e)=>create()}>Crear Categoria</button><input type='text' name='state' onChange={(e)=> setstate(e.target.value)} />
            </div>
            
            <div className="categorias_crear_map">
                {genders.map(e=><div className="genero_map" key={e}> 
                    <button onDoubleClick={()=>cambiar(e)} style={{background:'none',border:'none'}}><p className="genero_categoria">{e}</p></button>
                    <div className="botones_categoria">
                    <button className="eliminar_categoria"onClick={()=>removeGenero(e)}>Eliminar Categoría</button>
                    <div id={e}>
                        <div><input placeholder='Modificar Categoría' type='text' name='state' onChange={(e)=> setstate(e.target.value)}  /></div>
                        <div><button className="guardar_categoria" onClick={()=>edit(e)}>Guardar Cambios</button></div>
                        
                        
                    </div>
                    </div>
                </div>)}
            </div>
            
        </div>
    )
}
