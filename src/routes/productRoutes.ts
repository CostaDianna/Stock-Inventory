import express from "express";
import {
  putProduct,
  createProduct,
  getProductByBarcode,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

router.put("/products/:barcode", putProduct);
router.post("/products/:barcode", createProduct);
router.get("/products/:barcode", getProductByBarcode);
router.delete("deleteProduct/:barcode", deleteProduct);

export default router;