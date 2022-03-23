"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const poolController_1 = require("../controller/poolController");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
//Get all pools
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], poolController_1.PoolController.getAll);
//Create pool
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], poolController_1.PoolController.newPool);
//Edit pool
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], poolController_1.PoolController.editPool);
//Delete pool
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], poolController_1.PoolController.deletePool);
exports.default = router;
