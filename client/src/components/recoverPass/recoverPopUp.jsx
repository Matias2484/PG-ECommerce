import React, { useState } from 'react'
import ReactCircleModal from 'react-circle-modal'
import   './recoverPopUp.css'
import swal from 'sweetalert';



export default function RecoverPopUp (){
    const [aprove, setAprove] = useState(false)
    

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validarEmail(e) {
    const valor = e.target.value
    
    let msgRecoverPass = document.getElementById('msgRecoverPass')
    let btnRecoverPass = document.getElementById('enviaPop')
    if (re.test(String(valor).toLowerCase())){
        setAprove(true) 
        console.log(aprove)
        btnRecoverPass.style.backgroundColor = 'rgb(244, 164, 96)'
        msgRecoverPass.style.color = 'green'
        msgRecoverPass.textContent = "La dirección de email " +  valor + " es correcta!."
    } else {
        setAprove(false) 
        console.log(aprove)
        btnRecoverPass.style.backgroundColor = 'grey'
        msgRecoverPass.style.color = 'red'
        msgRecoverPass.textContent = "La dirección de email es incorrecta!."
    }
}   


    function handleSumbit(){
        document.getElementById('')
        swal({
            title: "Enviado",
            text: "revisa tu casilla de entrada o de spam recibiras un mail con una nueva contraseña",
            icon: "success",
            });
        }


    return (
        <ReactCircleModal 
        backgroundColor="rgb(244, 164, 96)"
        toogleComponent={onClick => (
            <button className="openPop" onClick={onClick}>
            ¡Recupérala!
            </button>
        )}
        offsetX={0}
        offsetY={0}
        >
        {(onClick) => (
            
            <div  className="pepe">
            
            <p>Escribe tu direccion de correo electronico a continuacion y recibiras una nueva clave</p><br />
            <p> revisa la bandeja de entrada o tu casilla de spam </p>
            <span id="msgRecoverPass"></span>
            <input 
            className="inputMail" 
            type="text" 
            placeholder="Escribe tu email..."
            name="email"
            changui="true"
            onChange={validarEmail}
            />
            {aprove ? (<button id="enviaPop" onClick={handleSumbit}>Enviar</button>):(
                <button id="enviaPop">nup :'C</button>
            )}
            
            <button className="closePop" onClick={onClick}>cancelar</button>
            </div>
        )}
        </ReactCircleModal>
    )
    }
    

