import React from 'react'

import  './loginForms.css'

export default function LoginForms  ({isOpen, closeModal,payload}){
    

    
        async function  handleSumbit (e){
            e.preventDefault()
            let data = {
                usuario: e.target[0].value,
                contrasena:e.target[1].value
            }
            console.log(data)
            await fetch('http://localhost:4000/',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            
        };

    return(
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className="modal_dialog">
            <button className="close" onClick={closeModal}>X</button>
            <form onSubmit={(e) => handleSumbit(e)} className="formLogin">
                    <h1 className="loginUser">Usuario</h1>
                    <input id="usuarioInput"  type="text" name="usuario"  placeholder="Usuario" />
                    <h1 className="loginPass">Contraseña</h1>
                    <input id="contrasenaInput"  type="text" name="conntraseña"  placeholder="contraseña"/>
                    <input id="buttonInput"  type="submit" className="logginBtn" value ="Logueate" />
                </form>
            </div>
        </div>
    );
};



