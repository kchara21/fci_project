"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
const express_1 = require("express");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
//Get all users
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.getAll);
//Get one user
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor', 'operador'])], UserController_1.UserController.getById);
//Create user 
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.newUser);
//Edit user
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.editUser);
//Delete user 
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.deleteUser);
exports.default = router;
