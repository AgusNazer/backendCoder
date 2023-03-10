import { json, Router } from "express";
import { ProductManager } from "../app.js";

const viewsRouter = Router()
viewsRouter.use(json())

viewsRouter.get("/", async (req,res)=>{
    const products = await ProductManager.getProducts()
    res.render("home", {products})
})

viewsRouter.get("/realTimeProducts", async (req,res)=>{
    const products = await ProductManager.getProducts()
    res.render("realTimeProducts", {products})            


    
})

export default viewsRouter