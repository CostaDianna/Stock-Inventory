
import express from 'express';
import { createSupplier, getSupplier,putSupplier, getSupplierByProduct } from '../controllers/supplierController';

const router = express.Router();

router.put('/suppliers/:cnpj', putSupplier);
router.post('/suppliers', createSupplier);
router.get('/suppliers/:cnpj', getSupplier);
router.get('/:supplierId/products', getSupplierByProduct);

export default router;
