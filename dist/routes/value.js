"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const valueController_1 = __importDefault(require("../controller/valueController"));
const router = (0, express_1.Router)();
//Get Values By Range Date
router.get('/getByDate/:pool/:parameter/:start/:end', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], valueController_1.default.getByDate);
//Get Values By Pool
router.get('/getByPool/:pool', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor'])], valueController_1.default.reportByPool);
exports.default = router;
