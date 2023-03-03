import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./utilities.js";

const app = express();

app.use(express.static(__dirname + "/../public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => console.log(`Server listening at port 8080`));





///// CODIGO DESAFIO 3 
// import express from "express";
// import ProductManager from "./productManager.js";



// const app = express();
// let manager = new ProductManager('./products.json');
// app.get("/", (req, res) => {
//   res.send("<h1>Hello world from express!</h1>");
// });
// app.get("/products", async (req, res) => {
//   res.send(getProducts());
// });

// app.get("/products/:id", async (req, res) => {
//   let num = parseInt(req.params.id);
//   res.send(manager.getProductById(num));
// });

// app.get("/products", async (req, res) => {
//   const product= await manager.getProducts()
//  let { limit } = req.query;
//   res.send(productos.filter((p) => p.id < limit));
// });

// app.listen(8080, () => console.log(`Server listening to port 8080`));