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
        let a = await dispatch(userLogin(data))
        setData({
            email:'',
            password:''
        })
       a.token && window.localStorage.setItem("token", a.token)
       a.token? (swal({
            title: "Bienvenido",
            icon: "success",
        })):(swal({
            title: "A ocurrido un error",
            icon: "error",
        }))

    }

    
    
    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
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
        let a = await dispatch(userLogin(login))
        a.token && window.localStorage.setItem("token", a.token)
        a.token? (swal({
            title: "Bienvenido",
            icon: "success",
        })):(swal({
            title: "A ocurrido un error",
            icon: "error",
        }))
    }
    return(
        <div id='logModal' className= 'logModal'>
            <div className="modal_dialog">
                <h1 className="title">inicia sesion </h1>
            <form onSubmit={handleSumbit} className="formLogin">
                    <h1 className="loginUser">Correo Electronico</h1>
                    <input  placeholder="Correo Electronico" className="inputMail" autoComplete='off' required name="email" onChange={handleChange} value={data.email}/>
                    <h1 className="loginPass">Contraseña</h1>
                    <input placeholder="password" name="password" className="inputPass"  type="password" required autoComplete='off' onChange={handleChange} value={data.password}/>
                    {data.email && data.password && <input id="buttonInput"  type="submit" className="logginBtn" value ="Logueate" />}
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
            <button className="close" onClick={closeModal}>Atrás</button>  
        </div>
    );
};




