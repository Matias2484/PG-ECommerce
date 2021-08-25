import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert';
import newUser from '../../funciones/newUser'
import '../registerForm/registerForm.css'
import GoogleLogin from 'react-google-login';

export default function RegisterForm({loginBarFunction}){

    const [input, setInput] = useState({
        nombre: '',
        apellido:'',
        password: '',
        email:'',
        
    });
        
        
    const handleInputChange = (e) => {

        setInput({
            ...input,  //Trae el estado anterior, para que no se pise con el nuevo estado.
            [e.target.name]: e.target.value
        });
    }
    const enviarInput = (e) => {
        e.preventDefault();
        loginBarFunction();
        closeRegisModal();
        if(input.nombre && input.password && input.email) {
            newUser(input);    
            swal({
                title: "Gracias",
                text: "Formulario enviado con éxito",
                icon: "success",
            });

        }
    }

        const closeRegisModal = () => {
            let logModal = document.getElementById('regisModal')
            let ninjaButton = document.getElementById('buttonsForms')
            logModal.style.opacity = '0';
            logModal.style.zIndex = '1'; 
            ninjaButton.style.opacity = '1';
            ninjaButton.style.zIndex = '2'
        }

        //loggin google
    const respuestaGoogle = async (respuesta)=>{

        const login = {
            apellido: respuesta.profileObj.familyName,
            password: respuesta.profileObj.googleId,
            email: respuesta.profileObj.email,
            nombre: respuesta.profileObj.givenName,
            foto: respuesta.profileObj.imageUrl
        }
       newUser(login)
    }
    
    return (
        <div id="regisModal" className="logModal">
            <div className="modal_dialog">
            <form  className="formLogin" onSubmit={enviarInput}>
                    <h1 className="regisName">Nombre</h1>
                    <input  placeholder="Tu nombre..." name="nombre" autoComplete='off' onChange={handleInputChange} />
                    <h1 className="regisLastName">Apellido</h1>
                    <input  placeholder="Tu apellido..." name="apellido" autoComplete='off'  onChange={handleInputChange} />
                    <h1 className="regisPass">Contraseña</h1>
                    <input placeholder="Elige una contraseña..." name="password" autoComplete='off'  type="password" onChange={handleInputChange}/>
                    <h1 className="regisEmail">Correo electronico</h1>
                    <input placeholder="email" name="email" type="email" autoComplete='off'  onChange={handleInputChange}/>
                    <input id="buttonInput" type="submit" className="regisBtn" autoComplete='off'  value ="Registrate" />
                </form>
                <GoogleLogin
                    clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                    buttonText="Registrate con google"
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <button className="close" onClick={closeRegisModal}>X</button>
        </div>
        </div>
    )
}