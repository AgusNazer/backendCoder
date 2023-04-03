import { Router, json } from "express";
import {CartManager, ProductManager} from "../dao/index.js";


const cartRouter = Router();
let cartManager = new CartManager("../cartManager/carts.json");
let productManager = new ProductManager("../files/products.json");
cartRouter.use(json());

cartRouter.get("/", async (req, res) => {
  let carrito = await cartManager.getCart();
  res.send(carrito);
});


cartRouter.post("/", async (req, res) => {
  let carrito = await cartManager.addCart();
  res.send(carrito);
});

cartRouter.get("/:cartId", async (req, res) => {
  let cartId = parseInt(req.params.cartId);
  let carrito = await cartManager.checkCart(cartId);
  res.send(carrito);
});

cartRouter.post("/:cartId/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cartId);
  let pid = parseInt(req.params.pid);
  let product = await productManager.getProductById(pid);
  let carrito = await cartManager.addProductToCart(cartId, product);
  res.send(carrito);
});

export default cartRouter;