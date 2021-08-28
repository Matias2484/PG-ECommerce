import React,{ useState }  from 'react';
import swal from 'sweetalert';
import newUser from '../../funciones/newUser'
import '../registerForm/registerForm.css'
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

export default function RegisterForm(){

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
    const enviarInput =async (e) => {
        e.preventDefault();
      
        let a= await newUser(input);   
        setInput({
            email:'',
            password:'',
            nombre:'',
            apellido:''
        })
        a.token && window.localStorage.setItem("token", a.token)
        a.token? (swal({
             title: "Bienvenido",
             icon: "success",
         })):(swal({
             title: "Ha ocurrido un error",
             icon: "error",
         })) 

        
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
        let a= await newUser(login);   
        a.token && window.localStorage.setItem("token", a.token)
        a.token? (swal({
            title: "Bienvenido",
            icon: "success",
        })):(swal({
            title: "Ha ocurrido un error",
            icon: "error",
        })) 
    }
    
    return (
        
        <div id="regisModal" className="logModal1">
            <div className="modal_dialog_regis1">
            <form  className="formLogin1" onSubmit={enviarInput}>
                    <h1 className="regisName1">Nombre</h1>
                    <input  placeholder="Tu nombre..." name="nombre" autoComplete='off' required   value={input.nombre} onChange={handleInputChange} />
                    <h1 className="regisLastName1">Apellido</h1>
                    <input  placeholder="Tu apellido..." name="apellido" autoComplete='off' required  value={input.apellido} onChange={handleInputChange} />
                    <h1 className="regisPass1">Contraseña</h1>
                    <input placeholder="Elige una contraseña..." name="password" autoComplete='off'  value={input.password} required minLength='6' type="password" onChange={handleInputChange}/>
                    <h1 className="regisEmail1">Correo electronico</h1>
                    <input placeholder="email" name="email" type="email" autoComplete='off' required value={input.email} onChange={handleInputChange}/>
                    <input id="buttonInput" type="submit" className="regisBtn1" autoComplete='off'  value ="Registrate" />
                </form>
                <GoogleLogin
                    clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                    buttonText="Registrate con google"
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <Link to="/"><button className="close">X</button></Link>
                
        </div>
        </div>
    )
}