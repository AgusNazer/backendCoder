import express from "express";
import productos from "./products";
import ProductManager from "./productManager.js";



const app = express();
app.get("/", (req, res) => {
  res.send("<h1>Hello world from express!</h1>");
});
app.get("/products", (req, res) => {
  res.send(productos);
});

let manager = new ProductManager();
app.get("/products/:id", async (req, res) => {
  let num = parseInt(req.params.id);
  res.send(manager.getProductById(num));
});

app.get("/products", (req, res) => {
 let { limit } = req.query;
  res.send(productos.filter((x) => x.id < limit));
});

app.listen(8080, () => console.log(`Server listening to port 8080`));