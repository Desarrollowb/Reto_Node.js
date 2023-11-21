import express from "express";
import productsRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import authenticateToken from "./middleware/authMiddleware.js";

import dotenv from 'dotenv';
dotenv.config();

const app = express()


app.use(express.json())

app.use('/auth', authRoutes)

app.use(authenticateToken);
app.use('/users', usersRoutes)


app.use(productsRoutes)




export default app;