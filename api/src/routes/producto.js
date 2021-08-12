const { Router } = require("express");
const router = Router();

const { dbConnection } = require("../configDB/config");
const Producto = require("../models/Producto");
const mongoose = require("mongoose");

dbConnection();

router.get("/", async (req, res) => {
  var books = await Producto.find({});
  res.json(books);
});

router.post("/", async (req, res) => {
  const {
    titulo,
    autor,
    editorial,
    descripcion,
    fecha,
    paginas,
    generos,
    img,
    idioma,
    precio,
  } = req.body;

  const producto = new Producto({
    titulo,
    autor,
    editorial,
    descripcion,
    fecha,
    paginas,
    generos,
    img,
    idioma,
    precio,
  });

  await producto.save();

  mongoose.connection.close();

  res.json({ ok: true });
});

module.exports = router;
