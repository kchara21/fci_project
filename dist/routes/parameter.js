"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parameterController_1 = require("../controller/parameterController");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
//Get all parameter
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.getAll);
//Get parameter byId
router.get('/byPool/:piscina', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.getByPool);
//Create paramether
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.newParam);
//Census paramether
router.get('/census/:id/:responsableId', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor', 'operador'])], parameterController_1.ParamController.censusParameter);
//Create paramether
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.newParam);
//Edit paramether
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.editParam);
//Delete paramether
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.deleteParam);
exports.default = router;
