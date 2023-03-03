import { Router, json } from "express";
import ProductManager from "../productManager/productManager.js";

const productsRouter = Router();
let manager = new ProductManager("../productManager/productos.json");
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send(products);
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  let num = parseInt(req.params.pid);
  const products = await manager.getProductById(num);
  res.send(products);
});

productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const newProd = await manager.addProducts({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  });
  res.send(newProd);
});

productsRouter.put("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock,category } = req.body;
  const updated = await manager.updateProduct(
    pid,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  );
  res.send(updated);
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const deleteProduct = await manager.deleteProduct(pid);
  res.send(deleteProduct);
});
export default productsRouter;