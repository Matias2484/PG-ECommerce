import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getGenders } from '../../Actions/index';
import {createPromo} from '../../funciones/promo'
import PromoGenero from './formPromo/promoGenero'
import Promo2x1 from './formPromo/promo2x1'

export default function Promo () {
    const token=window.localStorage.getItem('token')
    const dispatch = useDispatch()
    const genders= useSelector(state=>state.genders)
    const history= useHistory()
    useEffect(() => {
        dispatch(getGenders())
    }, [dispatch])

//-----estado principal para enviar al post de promo
    const [state, setstate] = useState({
        tipo:'',
        fechaInicio:'',
        fechaFinal:'', 
        porcentaje:'', 
        cantidad:'',
        gratis:'',
    });
//-----estado para colocar los multiples generos
    const [generos, setgeneros]= useState([])
    //-----estado para colocar los multiples generos
    const [diasPromo, setdiasPromo]= useState([])


//------modifica el estado principal
    function handleChange(e){
        setstate({
            ...state,
            [e.target.name]:e.target.value
        });
    };

//----modifica el estado de los generos
    function handleGenders(e){
     setgeneros(e)
    }

    function handleDias(e){
        setdiasPromo(e)
    }
//------une todos los estado creando un obj y lo envia para el post
   async function handleSubmit(e){
        e.preventDefault();
        const generosValue= generos.map(e=>e.value)
        const diasValue= diasPromo.map(e=>e.value)
        let res= await createPromo({...state,generos:generosValue,dias:diasValue},token)
      
        history.push('/')
    };

    const opcionGenero=genders.map(e=>{
        return {value:e, label: e}
    })
    const dias=[
        { value:'Mon',label:'Lunes'},
        { value:'Tue',label:'Martes'},
        { value:'Wed',label:'Miercoles'},
        { value:'Thu',label:'Jueves'},
        { value:'Fri',label:'Viernes'},
        { value:'Sat',label:'Sabado'},
        { value:'Sun',label:'Domingo'},
        { value:'All',label:'Todos los Dias'}
    ]
    var date = new Date();
        date=date.toISOString().split('T')[0]
  
    return (
        <div>
            <Promo2x1 dias={dias} date={date} />
            <PromoGenero dias={dias} opcionGenero={opcionGenero} date={date} />
        </div>
    )
}
