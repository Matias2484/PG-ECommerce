const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const {check}  = require ('express-validator')
const {createUser, loginUser, revalidarToken} = require ('../controllers/auth')
const {validarUser} = require ('../middleware/validarUser')
const {validarJWTUser, validarJWTAdmin} = require ("../middleware/validarJWT")
const Usuario = require("../models/Usuario")
const Orden = require("../models/Orden")
const Producto = require ("../models/Orden")


//----crea un nuevo usuario,los check son los campos oblogatorios, genera un token
//----si es con google enviar como clave el googleid
router.post(
    '/',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('apellido','el nombre es requerido').not().isEmpty(),
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    createUser
);
//----logea al usuario, recibe email y paswors, si es google envia googleid como clave,genera token
router.post(
    '/login',
    [
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    loginUser
);
//----elimina un usuario para que no se pueda logear
router.delete('/delete/:id',validarJWTUser,(req,res)=>{
    const {id}=req.params
    Usuario.findByIdAndDelete(id)
    res.send('ok')
})

//---esta en ver, es para regenerar el token
router.get('/renew',validarJWTUser, revalidarToken)

//----trae todo el historial de compras de un usuario en especifico
//----deben enviar token desde el front
router.get('/historyShopping',validarJWTUser, async(req,res)=>{
    const id=req.uid
    var {historialDeCompras}= await Usuario.findById(id)
    historialDeCompras = historialDeCompras.map(async e=> await Orden.findById(e._id).populate('productos.producto',['titulo','precio']))
    historialDeCompras= await Promise.all(historialDeCompras)
    console.log(historialDeCompras)
    res.send(historialDeCompras)

});

//-----trae los detalles de una orden en especifico
//-----info de producto, cantidas,direccion de entrga y info de usuario de compa
//-----recibe id de orden por params,para user
router.get('/see/:id', async (req,res)=>{
    const {id}=req.params
    const history= await Orden.findById(id)
                            .populate('productos.producto',['titulo','precio'])
    res.send(history)
});

router.get('/profile/:id',async (req,res)=>{
    const {id}= req.params
    const user= await Usuario.findById(id,{"password":0, "historialDeCompras":0})
    res.send(user)
});
router.post('/profile/edit/:id',async (req,res)=>{
    console.log('p')
    const {id}= req.params
    let userUpdate;
    req.body.foto? userUpdate= await Usuario.findByIdAndUpdate(id,{"foto":req.body.foto},{new:true}): userUpdate= await Usuario.findByIdAndUpdate(id,{"admin":req.body.admin},{new:true})

    res.send(userUpdate)
});

router.get('/profiles',async(req,res)=>{
    const users= await Usuario.find({},{"password":0, "historialDeCompras":0,"tarjetas":0,"direcciones":0})
    res.send(users)
})

module.exports = router;