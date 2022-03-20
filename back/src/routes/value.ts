
import {Router} from 'express';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
import ValueController from '../controller/valueController';

const router = Router();

//Get Values By Range Date
router.get('/getByDate/:pool/:parameter/:start/:end',[checkJwt,checkRole(['supervisor'])],ValueController.getByDate);

//Get Values By Pool
router.get('/getByPool/:pool',[checkJwt,checkRole(['supervisor'])],ValueController.reportByPool);



export default router;