import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import {IoMdRemoveCircleOutline, IoMdAddCircleOutline, IoIosCloseCircle } from "react-icons/io";
import swal from 'sweetalert';
import {addCart,removeAllCart, addBuyUser, removeOneCart} from '../../../Actions/index'
import {CardElement,useElements, useStripe} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import "./checkCart.css"

const stripePromise = loadStripe("pk_test_51JQAouFWmGEeX4odlkQmbhbHUp3CKtVyX8x3IAZOECCAv0E7LUzOZJoUyBS8C5LTiPBgpQNd3ZdNb2oBfZeRZFCR00fcFxXLfG")


export default function CheckCart(){
    const dispatch = useDispatch()
    const history= useHistory()

    const carts = useSelector((state)=>state.cart)

    const arrayCart=[]
    let precioTotal= 0   

    for (const i in carts) {
        arrayCart.push(carts[i])
    }

    var compras=[]
    for (const i in carts) {
        compras.push({producto:carts[i].id,cantidad:carts[i].count})
        precioTotal+=carts[i].precio*carts[i].count
    }

    
    const Payment = () => {

        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async(e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
        if(!error) {
           const {id} = paymentMethod;
           let pago = {
            productos:compras,
            valorTotal:Math.round(precioTotal),
            pago:id
        }
        let token= window.localStorage.getItem('token')
        dispatch(addBuyUser(pago,token))
        swal("purchase made!", "you will receive an email soon", "success");
        history.push('/')
        
          
        } else {
            console.log(error);
            
        }
    }
        return <form className= "form_compra" onSubmit={handleSubmit}>
        <CardElement className="tarjeta"/>
        <button>
            Comprar
        </button>
        </form>
    }


    return (
        <div className="pasarela">
            <h1 className="titulo_principal_pasarela">Resumen de la compra</h1>
        <div className="contenedor_pasarela">
            <div className="pasarela_card">
            {arrayCart.map(e=>{
                return (<div className="pasarela_cdtm">
                
                        <img className="imagen_pasarela"alt="imagen_pasarela"src={e.img}></img>
                        <p className="titulo_pasarela">{e.titulo}</p>
                        <p className="autor_pasarela">{e.autor}</p>
                        <p className="editorial_pasarela">{e.editorial}</p>
                        <p className="unidades_pasarela">Unidades: {e.count}</p>
                        <p className="precio_pasarela"><span className="peso_pasarela">$</span> {e.precio * e.count}</p>
                       
                    </div>)
                    
            })}
            </div>
            <div className="datos_pasarela">
                <p className='neto_pasarela'>Sub-Total: {precioTotal.toFixed(2)} </p>
                <p className='iva_pasarela'>iva: {(Math.round(precioTotal * 0.15))}</p>
                <p className='total_pasarela'>Total: {(Math.round(precioTotal + precioTotal * 0.15))}</p>
            </div>
            
            <Elements stripe={stripePromise}>
            <Payment/>
            </Elements>   
        </div>
    </div>
    )
}