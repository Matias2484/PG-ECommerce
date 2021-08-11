const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  titulo: {
    type: String,
    // required: [true, "El titulo es obligatorio"],
  },
  autor: {
    type: String,
    // required: [true, "El autor es obligatorio"],
  },
  editorial: {
    type: String,
    // required: [true, "La editorial es obligatoria"],
  },
  img: {
    type: String,
    // required: [true, "La img es obligatoria"],
  },
  descripcion: {
    type: String,
    // required: true,
  },
  fecha: {
    type: String,
  },
  paginas: {
    type: String,
  },
  generos: {
    type: String,
  },
  idioma: {
    type: String,
  },
  precio: {
    type: Number,
  },
});

const Producto = model("Producto", ProductoSchema);

module.exports = Producto;
