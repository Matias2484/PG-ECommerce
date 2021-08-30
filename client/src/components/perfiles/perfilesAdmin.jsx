import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {getProfiles} from '../../Actions/index'
import {Link} from 'react-router-dom'
import './perfilesAdmin.css'
export default function PerfilesAdmin(){
    const dispatch = useDispatch()
    const profiles=useSelector(state=>state.profiles)
    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <div className='perfilesAdmin'>
            <h1 className='titulo'>Usuarios registrados</h1>
          {profiles.map(e=><Link to={`profile/${e._id}`}><p className="userComplete" key={e._id}>{`${e.nombre} ${e.apellido}`}</p></Link>)}        
        </div>
    )
}
