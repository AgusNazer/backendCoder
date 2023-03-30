import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./util.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from "./routes/views.router.js";
import ChatManager from "./dao/db-managers/chat.manager.js";


const app = express();
app.use(urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());

const chatManager = new ChatManager();

mongoose
  .connect(
    "mongodb+srv://agustinnazer:Alma2023@clustercoder.qkxkrkr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((conn) => {
    console.log("Connected to DB!");
  });

const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected.");

  socket.on("new-message", async (data) => {
    const { stat, res } = await chatManager.newMessage(data);
    io.emit("messages", res.res);
  });
});

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

//midle para recibir io desde el router
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/", viewRouter);