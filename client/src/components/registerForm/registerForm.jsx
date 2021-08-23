import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import newUser from '../../funciones/newUser'

export default function RegisterForm({isOpen, closeModal}){
    const [input, setInput] = useState({
        nombre: '',
        apellido:'',
        password: '',
        email:'',
        admin: true,
        });
        
        const dispatch = useDispatch()
        const handleInputChange = (e) => {
    
            setInput({
              ...input,  //Trae el estado anterior, para que no se pise con el nuevo estado.
                [e.target.name]: e.target.value
            });
        }
        const enviarInput = (e) => {
            e.preventDefault();
            if(input.nombre && input.password && input.email) {
                swal({
                title: "Gracias",
                text: "Formulario enviado con éxito",
                icon: "success",
                });
                newUser(input);
            }
            }

    return (
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className="modal_dialog">
            <button className="close" onClick={closeModal}>X</button>
            <form  className="formLogin" onSubmit={enviarInput}>
                    <h1 className="loginUser">Nombre</h1>
                    <input  placeholder="username" name="nombre" onChange={handleInputChange} />
                    <h1 className="loginUser">Apellido</h1>
                    <input  placeholder="apellido" name="apellido" onChange={handleInputChange} />
                    <h1 className="loginPass">Contraseña</h1>
                    <input placeholder="password" name="password" type="password" onChange={handleInputChange}/>
                    <h1 className="loginPass">Correo electronico</h1>
                    <input placeholder="email" name="email" type="email" onChange={handleInputChange}/>
                    <input id="buttonInput" type="submit" className="logginBtn" value ="Registrate" />
                </form>
        </div>
        </div>
    )
}