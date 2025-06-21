import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
// ns-766.awsdns-31.net

// ns-1199.awsdns-21.org

// ns-1687.awsdns-18.co.uk

// ns-277.awsdns-34.com
