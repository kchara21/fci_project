import {Router} from 'express';
import {ApiController} from '../controller/apiController'
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';


const router = Router();

//Get all parameter
router.get('/',[checkJwt,checkRole(['supervisor','operador'])],ApiController.getAll);


export default router;