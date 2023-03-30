import express from "express";
import { ProductManager } from "../dao/index.js";
import ChatManager from "../dao/db-managers/chat.manager.js";


const viewsRouter = express.Router();
const productManager = new ProductManager("./products.json");
const chatManager = new ChatManager();

viewsRouter.get("/", async (req, res) => {
  const { stat, result } = await productManager.getProducts();
  if (stat === 400) {
    res.render("error");
  } else {
    res.render("home", { products: result });
  }
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
  const { stat, result } = await productManager.getProducts();
  if (stat === 400) {
    res.render("error");
  } else {
    res.render("realTimeProducts", { products: result });
  }
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    const { stat, result } = await chatManager.getMessages();
    res.render("chat", { messages: result });
  } catch (error) {
    res.render("error");
  }
});



export default viewsRouter