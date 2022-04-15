"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
const express_1 = require("express");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.getAll);
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor', 'operador'])], UserController_1.UserController.getById);
router.post('/', UserController_1.UserController.newUser);
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.editUser);
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], UserController_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map