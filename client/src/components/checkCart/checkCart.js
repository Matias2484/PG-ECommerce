import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import {IoMdRemoveCircleOutline, IoMdAddCircleOutline, IoIosCloseCircle } from "react-icons/io";
import swal from 'sweetalert';
import {addCart,removeAllCart, clearCart, removeOneCart} from '../../Actions/index'
import {CardElement,useElements, useStripe} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { generarPago } from './post';

const stripePromise = loadStripe("pk_test_51JQAouFWmGEeX4odlkQmbhbHUp3CKtVyX8x3IAZOECCAv0E7LUzOZJoUyBS8C5LTiPBgpQNd3ZdNb2oBfZeRZFCR00fcFxXLfG")


export default function CheckCart(){
    const dispatch = useDispatch()
    const history= useHistory()

    const carts = useSelector((state)=>state.cart)

    const arrayCart=[]
    let precioTotal= 0   

    for (const i in carts) {
        arrayCart.push(carts[i])
        precioTotal+=carts[i].precio*carts[i].count
    }

    function comprar(){
        swal("purchase made!", "you will receive an email soon", "success");
        dispatch(clearCart())
        history.push('/')
    }

    const titulo = arrayCart.map(e=> e.titulo)
    
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
           id,
           user_id: "611eb9fe31ebcebc18555759",
           valorTotal: Math.round(precioTotal + precioTotal * 0.5),
           description: titulo,
        }
        generarPago(pago)
        
          
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
        <div>
            {arrayCart.map(e=>{
                return (<div>
                    <button className='cartsButton' onClick={()=> dispatch(removeAllCart(e._id))}><IoIosCloseCircle/></button>
                        <p>{e.titulo}</p>
                        <p>Unidades: {e.count}</p>
                        <p>Precio: {e.precio * e.count}</p>
                        <div>
                            <button className='cartsButton' onClick={()=> dispatch(addCart(e._id))}><IoMdAddCircleOutline /></button>    
                            <button className='cartsButton' onClick={()=> dispatch(removeOneCart(e._id))}><IoMdRemoveCircleOutline /></button>
                        </div>                  
                    </div>)
            })}
            <div>
                <p>Precio: {precioTotal.toFixed(2)} </p>
                <p>iva: {(Math.round(precioTotal * 0.5))}</p>
                <p>Total: {(Math.round(precioTotal + precioTotal * 0.5))}</p>
            </div>
            <button onClick={()=>comprar()}>Pagar</button>
            
            <Elements stripe={stripePromise}>
            <Payment/>
            </Elements>   
        </div>
    )
}