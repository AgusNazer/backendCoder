import express from "express";
import ProductManager from "./productManager/ProductManager.js";
import CartManager from "./cartManager/CartManager.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./util.js";
// import handlebars from 'express-handlebars';
import {engine} from "express-handlebars"
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";

export const productManager = new ProductManager("./products.json");
export const cartManager = new CartManager("./cartManager/carts.json");

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/../public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(8080, ()=>{
    console.log("Server listening on port 8080.");
})

const io = new Server(httpServer)

io.on("connection", (socket)=>{
    console.log("New client connected.")
})

app.use((req,res,next)=>{
    req.io = io
    next()
})

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("/", viewsRouter)



// CODIGO 1 PRE ENTREGA
// const app = express();

// app.use(express.static(__dirname + "/../public"));

// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartRouter);

// app.listen(8080, () => console.log(`Server listening at port 8080`));





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