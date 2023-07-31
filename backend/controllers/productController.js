import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

// @desc get product by advisor
// @route POST /api/product
const getAllProduct = asyncHandler(async (req, res) => {
  const allProduct = await Product.find();

  res.send(allProduct);
});

// @desc Add product
// @route POST /api/product
const addProduct = asyncHandler(async (req, res) => {
  const {
    userId,
    productName,
    productDescription,
    productType,
    productStatus,
    advisorName,
    company,
    productUrl,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productType ||
    !productStatus ||
    !advisorName ||
    !company ||
    !productUrl
  ) {
    res.status(401).send({ errorMessage: "All fields are required!" });
  }

  const product = await Product.create({
    userId,
    productName,
    productDescription,
    productType,
    productStatus,
    advisorName,
    company,
    productUrl,
  });

  if (product) {
    res.status(200).send({ message: "Product successfully added!" });
  } else {
    res.status(401).send({ errorMessage: "Something went wrong!" });
  }
});


// @desc get product by advisor
// @route POST /api/product
const getProductByAdvisor = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const productDetails = await Product.find({ userId: userId });

  res.send(productDetails);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { userId, productId, productStatus } = req.body;

  const product = await Product.findById(productId).exec();

  if (product.productStatus === productStatus) {
    res.status(400).send({
      message: `Status is already ${
        productStatus === true ? "Active." : "Inactive."
      } `,
    });
  }
  product.productStatus = productStatus;

  const updateProduct = await product.save();

  if (updateProduct) {
    const productInfo = await Product.find({ userId: userId });

    if (productInfo) {
      res.status(200).send(productInfo);
    } else {
      res.status(401).send({ errorMessage: "Something went wrong!" });
    }
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById({ _id: productId });

  const confirmDelete = await product.deleteOne();

  if (confirmDelete) {
    res.status(200).send({ message: "Product has been deleted successfully" });
  }
});

export {
  getAllProduct,
  addProduct,
  getProductByAdvisor,
  updateProduct,
  deleteProduct,
};
