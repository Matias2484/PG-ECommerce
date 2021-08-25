import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {getProfiles} from '../../Actions/index'
import {Link} from 'react-router-dom'

export default function PerfilesAdmin(){
    const dispatch = useDispatch()
    const profiles=useSelector(state=>state.profiles)
    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <div>
          {profiles.map(e=><Link to={`profile/${e._id}`}><p key={e._id}>{`${e.nombre} ${e.apellido}`}</p></Link>)}        
        </div>
    )
}
