import express from 'express';
import { associateSupplierToProduct, dissociateSupplierFromProduct } from '../controllers/associationController';

const router = express.Router();

router.post('/associate', associateSupplierToProduct);
router.delete('/dissociate', dissociateSupplierFromProduct);

export default router;
