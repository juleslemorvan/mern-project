import Product from "../models/product.model.js";

export const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("error on get all products", error.message);
        res.status(500).json({ success: false, message: "products not found" });
    }
};

export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("error on update product", error.message);
        res.status(500).json({ success: false, message: "product not found" });
    }
};

export const CreateProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("error on create product", error.message);
        res.status(500).json({ success: false, message: "product not created" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("error on delete product", error.message);
        res.status(500).json({ success: false, message: "product not deleted" });
    }
};