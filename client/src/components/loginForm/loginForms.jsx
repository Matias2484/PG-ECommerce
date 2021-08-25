import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import userLogin from '../../funciones/logIn'
import {useDispatch} from 'react-redux';
import RecoverPopUp from '../recoverPass/recoverPopUp.jsx';
import  './loginForms.css';
import swal from 'sweetalert';


export default function LoginForms  ({loginBarFunction}){
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email:"",
        password:""
    });
    

    //funcion envia datos al BK
    const handleSumbit =  async (e) => {
        e.preventDefault()
        loginBarFunction()
        closeModal()
        enviarInput()
        const a = await dispatch( userLogin(data))
        window.localStorage.setItem("token", a.token, "user", a.user)
        
    }

    
    
    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const enviarInput = () => {
        if(data.password && data.email) {
            swal({
            title: "Bienvenido",
            text: "Logueado!",
            icon: "success",
            });
        }
        }

    const closeModal = () => {
        let logModal = document.getElementById('logModal')
        let ninjaButton = document.getElementById('buttonsForms')
        logModal.style.opacity = '0';
        logModal.style.zIndex = '1'; 
        ninjaButton.style.opacity = '1';
        ninjaButton.style.zIndex = '2'
    }

    //loggin google
    const respuestaGoogle = async (respuesta)=>{
        const login = {
            password: respuesta.profileObj.googleId,
            email: respuesta.profileObj.email
        }
        const a = await dispatch(userLogin(login))
        window.localStorage.setItem("token", a.token)
    }
    return(
        <div id='logModal' className= 'logModal'>
            <div className="modal_dialog">
            <form onSubmit={handleSumbit} className="formLogin">
                    <h1 className="loginUser">Correo Electronico</h1>
                    <input  placeholder="Correo Electronico" autoComplete='off' name="email" onChange={handleChange} value={data.username}/>
                    <h1 className="loginPass">Contraseña</h1>
                    <input placeholder="password" name="password" type="password" autoComplete='off' onChange={handleChange} value={data.password}/>
                    <input id="buttonInput"  type="submit" className="logginBtn" value ="Logueate" />
                </form>
                <GoogleLogin
                    clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                    buttonText="Logueate con google"
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <h1 className="olvidaste">¿Olvidaste tu contraseña?</h1>
                <RecoverPopUp/>
            </div>
            <button className="close" onClick={closeModal}>X</button>  
        </div>
    );
};




