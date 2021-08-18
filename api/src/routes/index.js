const { Router } = require("express");
const Producto = require("./producto.js");
const Genero = require("./genero");
const CartShopping = require ("./cartShopping")
const Orden = require("./orden")
const router = Router();

router.use("/productos", Producto);
router.use("/generos", Genero);
router.use("/cart", CartShopping)
router.use("/orden", Orden)

module.exports = router;
