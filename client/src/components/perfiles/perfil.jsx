import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from "react-router";
import {useHistory} from 'react-router-dom'
import Select from 'react-select';
import {getProfile, profileUpdate } from '../../Actions/index'
import {deletePerfil} from '../../funciones/delete'
import { payloadJWT } from '../../funciones/payloadJWT';
import './perfil.css'
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
            console.log(foto)
        setfoto(e.target.result)
        };
    };
    function deleteProfile(){
        deletePerfil(id)
        history.push('/')
    }
    function guardar(){
        token.admin? dispatch(profileUpdate(id,{admin})) : dispatch(profileUpdate(id,{foto}))
        setadmin('')
        setfoto('')
    }
    return (
        <div>
            <div className="userContenedor">
                <img className="fotoMarco" src={state.foto} alt='foto de perfil' />
                {!token.admin && <input type="file" required accept="image/*" className='inputFoto' onChange={(e)=>processImage(e)}/>}
            </div>
            <div className="table">
                <div className="childTable">
                {token.admin && <button onClick={()=>deleteProfile(id)}>Eliminar</button>}
                    <th>Usuario:</th><td>{`${state.nombre} ${state.apellido}`}</td><br />
                    <th>Email:</th><td>{state.email}</td><br />
                    <th>Estatus:</th> <td>{state.admin? <label>Administrador</label> : <label>Usuario</label>}</td><br />
                    {token.admin && admin.length===0 && <Select
                            options={!state.admin? [{ value:'true',label:'si'}]:[{ value:'false',label:'no'}]}
                            onChange={(e)=>setadmin(e.value)}
                            placeholder='cambiar estatus'
                        />}
                    {(admin.length>0 || foto.length>0) && <button onClick={()=>guardar()}>Guardar</button>}
                </div>
            </div>

        </div>
    )
}
