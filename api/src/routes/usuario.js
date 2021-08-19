const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const {check}  = require ('express-validator')
const {createUser, loginUser, revalidarToken} = require ('../controllers/auth')
const {validarUser} = require ('../middleware/validarUser')
const {validarJWT} = require ("../middleware/validarJWT")
const Usuario = require("../models/Usuario")

router.post(
    '/',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('apellido','el nombre es requerido').not().isEmpty(),
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        check('telefono','el numero de telefono es requerido').isMobilePhone(),
        check('documento', 'el documento es requerido').isNumeric().not().isEmpty(),
        validarUser
    ],
    createUser
);

router.post(
    '/login',
    [
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    loginUser
);

router.delete('/delete/:id',(req,res)=>{
    const id= req.uid
    Usuario.findByIdAndDelete(id)
    res.send({ok:true, msg:'el usuario fue borrado'})
})

router.get('/renew',validarJWT, revalidarToken)

router.get('/historyShopping',validarJWT, async(req,res)=>{
    const id=req.uid
    const historyShopping= await Usuario.findById(id)

    res.send(historyShopping.historialDeCompras)

})
//revisar porque falta id
router.get('/see/:id', (req,res)=>{
    const id=req.uid
    const {idOrden}=req.params
    const user= Usuario.findById(id)
    const searchOrden= user.aggregate([
        {$unwind: "$historialDeCompras"},
        {$match:{"$historialDeCompras.id":idOrden}}
    ])
})

module.exports = router;