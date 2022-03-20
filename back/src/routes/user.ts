import {UserController} from '../controller/UserController';
import {Router} from 'express';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
const router = Router();

//Get all users
router.get('/',[checkJwt,checkRole(['supervisor'])],UserController.getAll);

//Get one user
router.get('/:id',[checkJwt,checkRole(['supervisor','operador'])],UserController.getById);

//Create user 
router.post('/',[checkJwt,checkRole(['supervisor'])],UserController.newUser);

//Edit user
router.patch('/:id',[checkJwt,checkRole(['supervisor'])],UserController.editUser);

//Delete user 
router.delete('/:id',[checkJwt,checkRole(['supervisor'])],UserController.deleteUser);

export default router;