import {Router} from 'express';
import AuthController from '../controller/authController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
const router = Router()

//login
router.post('/login',AuthController.login);

//Change Passowrd
router.post('/change-password',[checkJwt],AuthController.changePassword);



export default router;