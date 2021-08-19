const jwt = require ('jsonwebtoken')
const {CLAVE_TOKEN} = process.env


const validarJWT= (req,res,next)=>{
    
    const token = req.header('x-token');
    
    
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {
        const {uid,name} = jwt.verify(
            token,
            CLAVE_TOKEN
        )
        req.uid=uid
        req.name=name
        
    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }
    

    next()
}


module.exports={
    validarJWT
}