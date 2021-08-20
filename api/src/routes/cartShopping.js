const { Router } = require("express");
/* const { dbConnection } = require("../configDB/config"); */

const router = Router();
const Usuario = require ("../models/Usuario")
const Producto= require("../models/Producto");
const {validarJWT} = require ("../middleware/validarJWT")


//-----guarda la compra ya hecha en el usuario
router.post('/', validarJWT, async (req,res)=>{
    const cart = req.body
    const id=req.uid
    await Usuario.findByIdAndUpdate(id, {$push:{"historialDeCompras": cart}})
    
    res.send({ok:true})
});
//------busca el libro, cambia el stock y lo envia al front para el carrito

router.get('/removeOne/:idRemoveOne',async (req,res)=>{
    const {idRemoveOne}= req.params

    var book = await Producto.findById(idRemoveOne)
    book = await Producto.findByIdAndUpdate({"_id":idRemoveOne},{"stock":book.stock+1},{new:true})

    res.send(book)
});

router.get('/removeAll/:idProducto/:count',async (req,res)=>{
    const {idProducto, count}= req.params

    var book = await Producto.findById(idProducto)
    book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock+Number(count)},{new:true})

    res.send(book)
});

router.get('/:idProducto',async (req,res)=>{
    const {idProducto}= req.params

    var book = await Producto.findById(idProducto)
    book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock-1},{new:true})

    res.send(book)
});

module.exports = router;
