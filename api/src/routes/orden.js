const Orden = require("../models/Orden");
const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const {validarJWTUser, validarJWTAdmin} = require("../middleware/validarJWT")
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

//----ruta para el admin, trae todas las compras que acen los usuario
router.get('/', validarJWTAdmin, async (req,res)=>{
    const history= await Orden.find({})
                              .populate('user',['nombre','apellido'])
                              .populate('productos.producto',['titulo'])
    res.send(history)
});
//-----trae los detalles de una orden en especifico
//-----info de producto, cantidas,direccion de entrga y info de usuario de compa
//-----recibe id de orden por params, solo para admin

router.get('/:idOrden',validarJWTAdmin, async (req,res)=>{
    const {idOrden}=req.params
    const history= await Orden.findById(idOrden)
                              .populate('user',['nombre','apellido','email'])
                              .populate('productos.producto',['titulo','precio'])
    res.send(history)
});
//---cambia el estado de una orden,recibe id de orden y estado
router.post('/:estado/:idOrden', validarJWTAdmin,async(req,res)=>{
    const {estado,idOrden}=req.params
    const orden= await Orden.findByIdAndUpdate(idOrden,{"estado":estado},{new:true})
    res.send(orden)
})
module.exports = router;