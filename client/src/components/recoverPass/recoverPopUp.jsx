import React, { useState } from 'react'
import ReactCircleModal from 'react-circle-modal'
import   './recoverPopUp.css'
import {passModifi, sendMail, changePass} from '../../funciones/recoverPass'


export default function RecoverPopUp (){
    const [aprove, setAprove] = useState(false)
    

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validarEmail(e) {
    const valor = e.target.value
    let msgRecoverPass = document.getElementById('msgRecoverPass')
    let btnRecoverPass = document.getElementById('enviaPop')
    if (re.test(String(valor).toLowerCase())){
        setAprove(true) 
        btnRecoverPass.style.backgroundColor = 'rgb(244, 164, 96)'
        msgRecoverPass.style.color = 'green'
        msgRecoverPass.textContent = "La dirección de email " +  valor + " es correcta!."
    } else {
        setAprove(false) 
        btnRecoverPass.style.backgroundColor = 'grey'
        msgRecoverPass.style.color = 'red'
        msgRecoverPass.textContent = "La dirección de email es incorrecta!."
    }
}   

    async function handleSumbit(){
        const correo = await sendMail(document.getElementById('inputMail').value)
            let pepeA = document.getElementById('pepeA')
            let pepeB = document.getElementById('pepeB')
            let pepeC = document.getElementById('pepeC')
            pepeA.style.opacity = '0';
            pepeA.style.zIndex = '1'; 

            pepeB.style.opacity = '1';
            pepeB.style.zIndex = '3'

            pepeC.style.opacity = '0'
            pepeC.style.zIndex = '2'
        }

        const handleClose = () => {
            let pepeA = document.getElementById('pepeA')
            let pepeB = document.getElementById('pepeB')
            let pepeC = document.getElementById('pepeC')
            pepeA.style.opacity = '1';
            pepeA.style.zIndex = '3'; 

            pepeB.style.opacity = '0';
            pepeB.style.zIndex = '2'

            pepeC.style.opacity = '0';
            pepeC.style.zIndex = '1'   
        }

        async  function handleSumbitModify (e){
            e.preventDefault()
            const a =  await passModifi(
            document.getElementById('code').value,
            document.getElementById('newPass').value,
            document.getElementById('inputMail').value
            )
            if(a.msg === "Codigo enviado"){
                let pepeB = document.getElementById('pepeB')
                let pepeC = document.getElementById('pepeC') 
                pepeB.style.opacity = '0';
                pepeB.style.zIndex = '1'

                pepeC.style.opacity = '1';
                pepeC.style.zIndex = '2' 
            }else{
                alert(a.msg)
            }
        }

        async function sumbitNewPass (e){
                e.preventDefault()
                const a =  await changePass(
                document.getElementById('code').value,
                document.getElementById('newPass').value,
                document.getElementById('inputMail').value
                )
                alert(a.msg)
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
                <div id="pepeA">
                    <p>Escribe tu direccion de correo electronico a continuacion y recibiras una nueva clave</p><br />
                    <p> revisa la bandeja de entrada o tu casilla de spam </p>
                    <span id="msgRecoverPass"></span>
                    <input 
                    id="inputMail"
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

                <div id="pepeB">
                    <button className="buttonBack" onClick={handleClose}> {"<====="} </button>
                    <h3>codigo</h3>
                    <input type="text"  id='code'name="code"/>
                    <button onClick={handleSumbitModify}>enviar</button>
                </div>


                <div id="pepeC">
                <button className="buttonBack" onClick={handleClose}> {"<====="} </button>
                    <h3>Nueva contra</h3>
                    <input type="text" id='newPass' name="newPass" />
                    <h3>Repita la contraseña</h3>
                    <input type="text"/>
                    <button onClick={sumbitNewPass}> Enviar </button>
                </div>

            </div>
        )}
        </ReactCircleModal>
    )
    }
    

