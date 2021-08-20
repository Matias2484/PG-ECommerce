const Orden = require("../models/Orden");
const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const Stripe = require("stripe")


const stripe = new Stripe("sk_test_51JQAouFWmGEeX4od3qJjkwW2cdTVunEMWXE9PgKcNaz0sU2DvmGqLMHAIhuix7usRB1f6oSbE9ZfkD92GKRTmVdv001bFGHwHL")

router.post('/', async (req,res)=>{

    try {
        const {id, valorTotal, description, user_id} = req.body;

        await stripe.paymentIntents.create({

            amount: valorTotal, 
            currency: "USD",
            description,
            payment_method: id,
            confirm: true
        })
        const compra = {
            id, 
            valorTotal, 
            description
        }
        console.log(compra)
        await Usuario.updateOne({_id: user_id},{ $push:{ historialDeCompras: compra } })
        console.log("2")
        res.send({message: "Pago Realizado"})
        // const orden= new Orden(req.body);
        // orden.user=req.uid
        // await orden.save();
        // res.send(orden)
        
    }
    catch (error){
        res.json(error)
    }
   

   
    
});




router.get('/', async (req,res)=>{
    const history= await Orden.find({})
    res.send(history)
})

module.exports = router;