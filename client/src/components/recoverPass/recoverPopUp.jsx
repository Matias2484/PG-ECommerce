import React, { useState }  from 'react'
import ReactCircleModal from 'react-circle-modal'
import   './recoverPopUp.css'
import validarEmail from '../../funciones/validateEmail'
import { useDispatch } from 'react-redux'


    export default function RecoverPopUp (){
        

    return (
        <ReactCircleModal 
        
        backgroundColor="rgb(244, 164, 96)"
        toogleComponent={onClick => (
            <button className="openPop" onClick={onClick}>
            Recuperar contraseña
            </button>
        )}
        offsetX={0}
        offsetY={0}
        >
        {(onClick) => (
            
            <div  className="pepe">
            
            <p>escribe tu direccion de correo electronico a continuacion y recibiras una nueva clave en la bandeja de entrada</p>

            <input 
            className="inputMail" 
            type="text" 
            placeholder="Escribe tu email..."
            name="email"
            changui="true"
            />
            <button className="enviaPop" >enviar</button>
            <button className="closePop" onClick={onClick}>cancelar</button>
            </div>
        )}
        </ReactCircleModal>
    )
    }


