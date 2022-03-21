"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../controller/UserController");
var express_1 = require("express");
var jwt_1 = require("../middlewares/jwt");
var role_1 = require("../middlewares/role");
var router = express_1.Router();
//Get all users
router.get('/', [jwt_1.checkJwt], UserController_1.UserController.getAll);
//Get one user
router.get('/:id', [jwt_1.checkJwt], UserController_1.UserController.getById);
//Create user 
router.post('/', [jwt_1.checkJwt, role_1.checkRole(['supervisor'])], UserController_1.UserController.newUser);
//Edit user
router.patch('/:id', [jwt_1.checkJwt], UserController_1.UserController.editUser);
//Delete user 
router.delete('/:id', [jwt_1.checkJwt], UserController_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map