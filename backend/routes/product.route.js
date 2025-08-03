import express from 'express';
import {creatProducts, getProducts, getProductById, deleteProductById} from "../controllers/product.controller.js";


const router = express.Router();

router.post('/create', creatProducts)
router.get('/allproducts', getProducts)
router.get('/:productId', getProductById)
router.delete('/:productId', deleteProductById)

export default router;
