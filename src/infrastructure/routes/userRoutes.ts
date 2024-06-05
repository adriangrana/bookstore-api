import { Router } from 'express';
import { UserService } from '../../application/services/userService';
import { createUser, getUserById, getAllUsers } from '../controllers/userController';

const userRoutes = (userService: UserService) => {
  const router = Router();

  // Pasar el userService a los controladores
  router.post('/users', (req, res) => createUser(req, res, userService));
  router.get('/users/:id', (req, res) => getUserById(req, res, userService));
  router.get('/users', (req, res) => getAllUsers(req, res, userService));

  return router;
};

export default userRoutes;
