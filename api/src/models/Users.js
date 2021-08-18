const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    Nombre: {
        type: String,
        required: true
    },
    Apellido: {
        type: String,
        required: true
    },
    CorreoElectronico: {
        type: String,
        required: true
    },
    Telefono:{
        type:String,
        requiere:true
    },
    Documento: {
        type: Number,
        required: true
    },   
    Direcciones: {
        type: Array,
        required: true
    },
    HistorialDeCompras: {
        type: Boolean,
        required: true
    },
    Admin:{
        type: Boolean,
        required: true
    },

});

module.exports= model('Usuario', UsuarioSchema)