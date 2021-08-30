const { Schema, model } = require('mongoose');

const PromoSchema = Schema({
    tipo: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        default : Date.now
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    dias:{
        type: Array,
        require: true
    },
    porcentaje: {
        type: Number
    },
    cantidad: {
        type: Number
    },
    grsatis:{
        type: Number
    },
    genero:{
        type: Array
    }
});

module.exports= model('Promo', PromoSchema)
