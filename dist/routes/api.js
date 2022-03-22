"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = require("../controller/apiController");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = (0, express_1.Router)();
router.get('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['supervisor', 'operador'])], apiController_1.ApiController.getAll);
exports.default = router;
//# sourceMappingURL=api.js.map