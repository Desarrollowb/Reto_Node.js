import { Router } from "express";
import authenticateToken from '../middleware/authMiddleware.js';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controllers/products.controllers.js'

const router = Router()

router.post('/products', createProduct)

router.use(authenticateToken);
router.get('/products', getProducts)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)
router.get('/products/:id', getProduct)


export default router