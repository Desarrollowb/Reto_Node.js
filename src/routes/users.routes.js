import { Router } from 'express';
import { getUsers, deleteUser } from '../controllers/users.controllers.js';
import authenticateToken from '../middleware/authMiddleware.js';

const usersRoutes = Router();

usersRoutes.use(authenticateToken);

usersRoutes.get('/users', getUsers);
usersRoutes.delete('/users/:id', deleteUser);

export default usersRoutes;