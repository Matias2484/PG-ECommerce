const Orden = require("../models/Orden");
const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();


router.post('/', async (req,res)=>{
    const orden= new Orden(req.body);
    orden.user=req.uid
    await orden.save();
    res.send(orden)
    
});

module.exports = router;