import express from "express";

import { userSignup, userLogin} from "../controller/user-controller.js";
import { getProducts, getProductById } from '../controller/product-controller.js'
import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js'

const router = express.Router();

// signup and login
router.post('/signup', userSignup);
router.post('/login', userLogin);

// slide's products
router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

export default router;