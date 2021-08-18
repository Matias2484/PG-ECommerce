const jwt = require('jsonwebtoken')
const {CLAVE_TOKEN}=process.env

const generarJWT =(uid, name)=>{
    return new Promise ((resolve,reject)=>{
        const payload = {uid, name};

        jwt.sign(payload,CLAVE_TOKEN, {
            expiresIn: '4h'
        },(err , token)=>{
            err ? reject('no se puede generar el token') : resolve (token)
        })
    })
}

module.exports={
    generarJWT
}