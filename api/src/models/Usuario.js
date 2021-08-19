const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true
    },
    Telefono:{
        type:String,
    },
    documento: {
        type: Number,
        required: true,
        unique: true
    },   
    direcciones: {
        type: Array
    },
    historialDeCompras: {
        type: Array
    },
    admin:{
        type: Boolean,
        required: true
    },

});

module.exports= model('Usuario', UsuarioSchema)