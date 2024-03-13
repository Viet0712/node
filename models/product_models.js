const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Enter Product Id!!"],
    },
    product_name: {
      type: String,
      required: [true, "Please Enter Product Name!!"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
      default: "Không Có",
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
