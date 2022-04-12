"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parameterController_1 = require("../controller/parameterController");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.getAll);
router.get('/byPool/:piscina', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.getByPool);
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.newParam);
router.get('/census/:id/:responsableId', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor', 'operador'])], parameterController_1.ParamController.censusParameter);
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.newParam);
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.editParam);
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], parameterController_1.ParamController.deleteParam);
exports.default = router;
//# sourceMappingURL=parameter.js.map