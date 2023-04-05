import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./util.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from "./routes/views.router.js";
import ChatManager from "./dao/db-managers/chat.manager.js";

// import productsModel from "./dao/models/product.model.js";
// import cartModel from "./dao/models/cart.model.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/../public"));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const chatManager = new ChatManager();


mongoose
  .connect(
    "mongodb+srv://agustinnazer:Alma2023@clustercoder.qkxkrkr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((conn) => {
    console.log("Connected to DB!");
  })
  .catch(() => {
    console.log("Error");
  });

  //desafio 4-4-23
//   const products = await productsModel.aggregate([
//     { $group: { _id: "$title", Precio: { $sum: "$price"} }  },
//     { $sort: {Precio: -1} },
//     { $group: { _id: 1, products: { $push: "$$ROOT"} } },
//     {
//         $project: {
//             _id: 0,
//             zapatillas: "$products",
//         },
//     },
//     { $merge: { into: "reports" } },
// ]);
// console.log(products);


// const cart = await cartModel.findById("6420aed66e7b33491341d6b6")
// console.log(JSON.stringify(cart, null, "\t"));




// main();


  
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected.");

  socket.on("new-message", async (data) => {
    const { stat, result } = await chatManager.newMessage(data);
    io.emit("messages", result.result);
  });
});

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//midleware para recibir io desde el router
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/", viewRouter);