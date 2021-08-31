import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from "react-router";
import {useHistory} from 'react-router-dom'
import Select from 'react-select';
import {getProfile, profileUpdate } from '../../Actions/index';
import {deletePerfil} from '../../funciones/delete';
import { payloadJWT } from '../../funciones/storage/payloadJWT';
import swal from 'sweetalert';
import './perfil.css';

export default function Perfil() {

    const dispatch = useDispatch()
    const {id} = useParams();
    const history= useHistory()
    const state = useSelector(state => state.profile)
    const [foto, setfoto] = useState('')
    const [admin,setadmin]= useState('')


    
    var token=payloadJWT()
    useEffect(() => {
        dispatch(getProfile(id))
    }, [dispatch,id])

    function processImage(e){
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl.readAsDataURL(imageFile)
        imageUrl.onload=(e)=>{
        setfoto(e.target.result)
        };
    };

    async function deleteProfiles(){
        
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
        });
        if(mando){
            let token=window.localStorage.getItem('token')
            await deletePerfil(id,token) 
            swal ( " ¡Usuario Eliminado! " , { 
                icon: "success",
                botón : false , 
              } ) ;
            history.push('/profiles')                      
        };
    };

    function guardar(){
        token.admin? dispatch(profileUpdate(id,{admin})) : dispatch(profileUpdate(id,{foto}))
        setadmin('')
        setfoto('')
    }

    return (
        <div>
            <div className="userContenedor">
                <img className="fotoMarco" src={state.foto} alt='foto de perfil' />
                {!token.admin && <div className='realButton'>Subi tu foto<input type="file" required accept="image/*" className='inputFoto' onChange={(e)=>processImage(e)}/></div>}
            </div>
            <div className="table">
                <div className="childTable">
                {token.admin && <button onClick={()=>deleteProfiles()}>Eliminar</button>}
                    <p><b>Usuario:</b> <label>{`${state.nombre} ${state.apellido}`}</label></p><br />
                    <p><b>Email:</b> <label>{state.email}</label></p><br />
                    <p><b>Estatus:</b> {state.admin? <label>Administrador</label> : <label>Usuario</label>}</p><br />
                    {token.admin && admin.length===0 &&
                        <Select
                            options={!state.admin? [{ value:'true',label:'Nombrar Administrador'}]:[{ value:'false',label:'Nombrar Usuario'}]}
                            onChange={(e)=>setadmin(e.value)}
                            placeholder='cambiar estatus'
                        />}
                    {(admin.length>0 || foto.length>0) && <button onClick={()=>guardar()}>Guardar</button>}
                </div>
            </div>

        </div>
    )
}
