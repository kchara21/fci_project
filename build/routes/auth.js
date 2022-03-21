"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controller/authController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//login
router.post('/login', authController_1.default.login);
//Change Passowrd
router.post('/change-password', [jwt_1.checkJwt], authController_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map