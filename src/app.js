import express from "express";
import ProductManager from "./productManager.js";



const app = express();
let manager = new ProductManager('./products.json');
app.get("/", (req, res) => {
  res.send("<h1>Hello world from express!</h1>");
});
app.get("/products", async (req, res) => {
  res.send(getProducts());
});

app.get("/products/:id", async (req, res) => {
  let num = parseInt(req.params.id);
  res.send(manager.getProductById(num));
});

app.get("/products", async (req, res) => {
  const product= await manager.getProducts()
 let { limit } = req.query;
  res.send(productos.filter((p) => p.id < limit));
});

app.listen(8080, () => console.log(`Server listening to port 8080`));