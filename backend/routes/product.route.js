import express from "express";
import { CreateProduct, deleteProduct, GetAllProducts, UpdateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// GET ALL PRODUCTS

router.get("/", GetAllProducts);

// UPDATE A PRODUCT

router.put("/:id", UpdateProduct);

// CREATE A NEW PRODUCT

router.post("/", CreateProduct);

// DELETE A PRODUCT

router.delete("/:id", deleteProduct);

export default router;
