import {Router} from 'express';
import { PoolController } from '../controller/poolController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
const router = Router();

//Get all pools
router.get('/',[checkJwt,checkRole(['supervisor'])],PoolController.getAll);

//Create pool
router.post('/',[checkJwt,checkRole(['supervisor'])],PoolController.newPool);

//Edit pool
router.patch('/:id',[checkJwt,checkRole(['supervisor'])],PoolController.editPool);

//Delete pool
router.delete('/:id',[checkJwt,checkRole(['supervisor'])],PoolController.deletePool);

export default router;