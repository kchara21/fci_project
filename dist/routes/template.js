"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const templateController_1 = require("../controller/templateController");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
//Get all paramethers
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor"])], templateController_1.TemplateController.getAll);
//Get one paramether
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor"])], templateController_1.TemplateController.getById);
//Get parameter by Pool
router.get('/byPool/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor", "operador"])], templateController_1.TemplateController.getTemplateByPool);
//Get parameter byId
router.get('/byName/:nombre', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor"])], templateController_1.TemplateController.getByParam);
//Create paramether
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor"])], templateController_1.TemplateController.newParam);
//Edit paramether
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor"])], templateController_1.TemplateController.editParam);
//Delete paramether
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(["supervisor"])], templateController_1.TemplateController.deleteParam);
exports.default = router;
