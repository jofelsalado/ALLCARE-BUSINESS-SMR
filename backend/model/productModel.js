import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    productStatus: {
      type: Boolean,
      default: true,
      required: true,
    },
    advisorName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    productUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
