import { Router, json } from "express";
import { ProductManager } from "../dao/index.js";

// agregue const productManager
const productManager = new ProductManager ('./products.json');
const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send(products.json);
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
  const newProd = await productManager.addProducts({
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