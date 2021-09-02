import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {getProfiles} from '../../Actions/index'
import {NavLink} from 'react-router-dom'
import './perfilesAdmin.css'
export default function PerfilesAdmin(){
    const dispatch = useDispatch()
    const profiles=useSelector(state=>state.profiles)
    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <div className='perfilesAdmin'>
            <h1 className='titulo_Perfiles'>Usuarios Registrados</h1>
            <div className="perfiles_admin">
            {profiles.map(e=><div className="perfiles_foto_nombre"><img className="foto_perfil_admin" src={e.foto}></img><NavLink style={{"textDecoration": "none"}}key={e._id} to={`profile/${e._id}`}>
                <p className="userComplete" >{`${e.nombre} ${e.apellido}`}</p></NavLink></div>)}        
            </div>
        
        </div>
    )
}
