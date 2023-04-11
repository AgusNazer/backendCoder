import { Router, json } from "express";
import {CartManager, ProductManager} from "../dao/index.js";


const cartRouter = Router();
let cartManager = new CartManager("../cartManager/carts.json");
let productManager = new ProductManager("../files/products.json");
cartRouter.use(json());


// fileSystem
// cartRouter.get("/", async (req, res) => {
//   let carrito = await cartManager.getCart();
//   res.send(carrito);
// });


cartRouter.post("/:cartId/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cartId);
  let pid = parseInt(req.params.pid);
  let product = await productManager.getProductById(pid);
  let carrito = await cartManager.addProductToCart(cartId, product);
  res.send(carrito);
});

cartRouter.post("/", async (req, res) => {
  // siguiente linea hay q pasarle algo al .addCart
  let carrito = await cartManager.addCart(product);
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
//Busco carrito por id
cartRouter.get("/:cartId", async (req, res) => {
  let cid = (req.params.cid);
  let cart = await manager.checkCart(cid);
  res.send({status:'ok',payload: cart});
});
//Agrego producto al carrito
cartRouter.put("/:cartId/product/:pid", async (req, res) => {
  let cid =(req.params.cid);
  let pid =(req.params.pid);
  let cart = await manager.addProductToCart(cid, pid);
  res.send({status:'ok',payload:cart});
});
//Elimino producto del carrito
cartRouter.delete('/:cartId/product/:pid', async(req,res)=>{
  let cid =(req.params.cid);
  let pid =(req.params.pid);
  let products= await manager.deleteProduct(cid,pid)
  res.send({status:'ok',payload:products})
});
//Elimino todos los productos del carrito
cartRouter.delete('/:cartId', async(req,res)=>{
  let cid =(req.params.cid);
const cart= await manager.deleteProductsInCart(cid)
res.send({status:'ok',payload: cart})
});
//Acualizo la cantidad de productos
cartRouter.put('/:cartId/product/:pid', async(req,res)=>{
  let cid =(req.params.cid);
  let pid= req.params.pid
  const{quantity}= req.body
  let cart= await manager.updateQuantity(cid,pid,quantity)
res.send({status:'ok',payload:cart})
});


export default cartRouter;