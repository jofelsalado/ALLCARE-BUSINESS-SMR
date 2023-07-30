import express from "express";
const router = express.Router();
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductByAdvisor,
  updateProduct,
} from "../controllers/productController.js";

router.put("/", updateProduct);
router.route("/").get(getAllProduct).post(addProduct);
router.post("/advisor-product", getProductByAdvisor);
router.post("/delete", deleteProduct);

export default router;
