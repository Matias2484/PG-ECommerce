import React,{useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {seeCart} from '../../Actions/index'
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './markers'
import { tiendas } from './iconMap/tiendas'
import { direccion } from '../../funciones/direccion'
import './sucursales.css'
import swal from 'sweetalert';

export default function Sucursales (){
    const dispatch = useDispatch()

    // const [state, setState]= useState({
    //     lat:'-34.598387932559795', 
    //     lng: '-58.439818381557'
    // })

    useEffect(() => {
        dispatch(seeCart())
    }, [])

    function locationUser(){
        navigator.geolocation.getCurrentPosition(
            function(position){
                var search ={lat: position.coords.latitude,lng: position.coords.longitude}
                var sucursal= direccion(tiendas,search)
                // setState(sucursal)
                swal(sucursal.name, sucursal.direct,"info");
            },
            function(error){
                console.log(error)
            },
            {enableHighAccuracy:true}
            )
    }
    return <div>
        <div>
            <h2>Sucursales</h2>
            <p>Somos una de las librerias mas antiguas de Buenos Aires; actualmente contamos con 8 sucursales fisicas; no dudes en visitarnos</p>
            <div>
                    <p>buscar sucursal mas cercana  <button onClick={()=>locationUser()}>X</button></p> 
            </div>
        </div>
        <div className='map'>
            <MapContainer center={{lat:'-34.598387932559795',lng: '-58.439818381557'}} zoom={13} scrollWheelZoom={true}>
                <TileLayer 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers />
            </MapContainer>            
        </div>
    </div>

}
