"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const jwt_1 = require("../middlewares/jwt");
const router = (0, express_1.Router)();
//login
router.post('/login', authController_1.default.login);
//Change Passowrd
router.post('/change-password', [jwt_1.checkJwt], authController_1.default.changePassword);
exports.default = router;
