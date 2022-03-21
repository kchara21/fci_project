import {Router} from 'express';
import { TemplateController } from '../controller/templateController';
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';
const router = Router();

//Get all paramethers
router.get('/',[checkJwt,checkRole(["supervisor"])],TemplateController.getAll);

//Get one paramether
router.get('/:id',[checkJwt,checkRole(["supervisor"])],TemplateController.getById);

//Get parameter by Pool
router.get('/byPool/:id',[checkJwt,checkRole(["supervisor","operador"])],TemplateController.getTemplateByPool);

//Get parameter byId
router.get('/byName/:nombre',[checkJwt,checkRole(["supervisor"])],TemplateController.getByParam);


//Create paramether
router.post('/',[checkJwt,checkRole(["supervisor"])],TemplateController.newParam);

//Edit paramether
router.patch('/:id',[checkJwt,checkRole(["supervisor"])],TemplateController.editParam);

//Delete paramether
router.delete('/:id',[checkJwt,checkRole(["supervisor"])],TemplateController.deleteParam);

export default router;