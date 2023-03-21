import { json, Router } from "express";
import { productManager } from "../app.js";

const viewsRouter = Router()
viewsRouter.use(json())

viewsRouter.get("/", async (req,res)=>{
    const products = await productManager.getProducts()
    res.render("home", {products})
})

viewsRouter.get("/realTimeProducts", async (req,res)=>{
    const products = await productManager.getProducts()
    res.render("realTimeProducts", {products})            


    
})

export default viewsRouter