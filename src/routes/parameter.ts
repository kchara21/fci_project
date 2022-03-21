import {Router} from 'express';
import { ParamController } from '../controller/parameterController';
import { ApiController } from '../controller/apiController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';


const router = Router();

//Get all parameter
router.get('/',[checkJwt,checkRole(['supervisor'])],ParamController.getAll);

//Get parameter byId
router.get('/byPool/:piscina',[checkJwt,checkRole(['supervisor'])],ParamController.getByPool);







//Create paramether
router.post('/',[checkJwt,checkRole(['supervisor'])],ParamController.newParam);

//Census paramether
router.get('/census/:id/:responsableId',[checkJwt,checkRole(['supervisor','operador'])],ParamController.censusParameter);


//Create paramether
router.post('/',[checkJwt,checkRole(['supervisor'])],ParamController.newParam);

//Edit paramether
router.patch('/:id',[checkJwt,checkRole(['supervisor'])],ParamController.editParam);

//Delete paramether
router.delete('/:id',[checkJwt,checkRole(['supervisor'])],ParamController.deleteParam);




export default router;