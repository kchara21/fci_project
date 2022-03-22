"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const template_1 = __importDefault(require("./template"));
const user_1 = __importDefault(require("./user"));
const pool_1 = __importDefault(require("./pool"));
const api_1 = __importDefault(require("./api"));
const value_1 = __importDefault(require("./value"));
const parameter_1 = __importDefault(require("./parameter"));
const routes = (0, express_1.Router)();
routes.use('/auth', auth_1.default);
routes.use('/user', user_1.default);
routes.use('/template', template_1.default);
routes.use('/pool', pool_1.default);
routes.use('/api', api_1.default);
routes.use('/parameter', parameter_1.default);
routes.use('/value', value_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map