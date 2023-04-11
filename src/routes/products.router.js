import { Router, json } from "express";
import { ProductManager } from "../dao/index.js";

const productManager = new ProductManager ('./products.json');
const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    // const products = await manager.getProducts();

    // correccion del tutor, verificarla
    const products = await ProductManager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      // res.send(products.json);
      res.send({ status: "ok", payload: products });
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  let num = parseInt(req.params.pid);
  const products = await productManager.getProductById(num);
  res.send(products);
});

productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const newProd = await productManager.addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  });
  res.send({ status: "ok", payload: newProd });
});

productsRouter.put("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock,category } = req.body;
  const updated = await productManager.updateProduct(
    pid,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  );
  res.send({ status: "ok", payload: updated });
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const deleteProduct = await productManager.deleteProduct(pid);
  res.send(deleteProduct);
});
//
// productsRouter.get("/page", async (req, res) => {
//   const { page } = req.query;
//   if (page===null){
//     page=1
//   }
//   const products = await productsModel.paginate(
//     {},
//     {
//       limit: 2,
//       lean: true,
//       page: page ?? 1,
//     }
//   );
//   console.log(products);
//   res.render("home", { products });
// });


export default productsRouter;